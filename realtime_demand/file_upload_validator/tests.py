import os
import csv
from django.test import TestCase, Client
from django.contrib.auth.models import User
import pandas as pd
from realtime_demand.models import Asset, AssetInvestors, Investor


class FileUploadTestCase(TestCase):

    def setUp(self):
        self.admin_password = "se3CurePass1ord!"
        self.admin_user = User.objects.create_superuser("adminuser", "admin@valuationquants.com", self.admin_password)

    def test_file_upload(self):
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        test_data_path = "{}{}".format(base_path, "/file_upload_validator/test_data/DecomposeValuationsSimple.csv")
        c = Client()
        c.login(username=self.admin_user.username, password=self.admin_password)

        with open(test_data_path, 'r') as asset_file:
            self.assertGreater(len(list(asset_file)), 0)

        with open(test_data_path, 'r') as asset_file:
            res = c.post("/admin/file/upload", {
                "asset_file": asset_file
            })
            self.assertEqual(res.status_code, 200)
            self.assertEqual(len(res.context["form"].errors), 0)

        with open(test_data_path, 'r') as asset_file:
            self.validate_asset_file(asset_file)

        update_path = "{}{}".format(base_path, "/file_upload_validator/test_data/DecomposeValuationsSimpleMod.csv")
        with open(update_path, 'r') as asset_file:
            res = c.post("/admin/file/upload", {
                "asset_file": asset_file
            })
            self.assertEqual(res.status_code, 200)
            self.assertEqual(len(res.context["form"].errors), 0)

        with open(update_path, 'r') as asset_file:
            self.validate_asset_file(asset_file)

    def validate_asset_file(self, asset_file):
        df = pd.read_csv(asset_file)
        group_by_order = ["ticker", "comnam", "M", "MF", "viI", "viH"]
        asset_dict_investor_df = {tup[0]: tup[1] for tup in list(df.groupby(group_by_order))}
        for asset_list, investor_df in asset_dict_investor_df.iteritems():
            ticker = asset_list[0]
            company_name = asset_list[1]
            current_market_cap = asset_list[2]
            fundamental_value = asset_list[3]
            total_latent_demand_value = asset_list[4]
            household_value = asset_list[5]
            self.assertTrue(Asset.objects.filter(ticker=ticker).exists())
            asset = Asset.objects.get(ticker=ticker)
            self.assertEqual(asset.company_name, company_name)
            self.assertEqual(asset.current_market_cap, current_market_cap)
            self.assertEqual(asset.fundamental_value, fundamental_value)
            self.assertEqual(asset.total_latent_demand_value, total_latent_demand_value)
            self.assertEqual(asset.household_value, household_value)
            self.assertEqual(asset.asset_investors.all().count(), 5)
            for index, row in investor_df.iterrows():
                investor_name = row["mgrname"]
                investor_latent_demand_value = row["viInv"]
                self.assertTrue(Investor.objects.filter(name=investor_name))
                investor = Investor.objects.get(name=investor_name)
                self.assertTrue(AssetInvestors.objects.filter(asset=asset, investor=investor))
                asset_investor = AssetInvestors.objects.get(asset=asset, investor=investor)
                self.assertEqual(asset_investor.latent_demand_value, investor_latent_demand_value)
