import os
import csv
from django.test import TestCase, Client
from django.contrib.auth.models import User
from realtime_demand.models import Asset, AssetInvestors, Investor


class FileUploadTestCase(TestCase):

    def setUp(self):
        self.admin_password = "se3CurePass1ord!"
        self.admin_user = User.objects.create_superuser("adminuser", "admin@valuationquants.com", self.admin_password)

    def test_file_upload(self):
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        test_data_path = "{}{}".format(base_path, "/file_upload_validator/test_data")
        asset_data_csv = "{}{}".format(test_data_path, "/asset_data.csv")
        investor_data_csv = "{}{}".format(test_data_path, "/investor_data.csv")
        c = Client()
        c.login(username=self.admin_user.username, password=self.admin_password)

        with open(asset_data_csv, 'r') as asset_file, open(investor_data_csv, 'r') as investor_file:
            res = c.post("/admin/file/upload", {
                "investor_file": investor_file,
                "asset_file": asset_file
            })
            self.assertEqual(res.status_code, 200)
            self.assertEqual(len(res.context["form"].errors), 0)

        with open(asset_data_csv, 'r') as asset_file, open(investor_data_csv, 'r') as investor_file:

            investor_data_reader = csv.DictReader(investor_file)
            for row in investor_data_reader:
                investor = row["Investor"]
                aum = int(row["AUM"])
                self.assertTrue(Investor.objects.filter(name=investor, aum=aum).exists())
                investor_local = Investor.objects.get(name=investor)
                self.assertEqual(investor_local.aum, aum)

            asset_data_reader = csv.DictReader(asset_file)
            for row in asset_data_reader:
                ticker = row["Ticker"]
                self.assertTrue(Asset.objects.filter(ticker=ticker).exists())

                company_name = row["Company Name"]
                price = float(row["Price"])
                fundamental_value = float(row["Fundamental Value"])
                asset_local = Asset.objects.get(ticker=ticker)
                self.assertEqual(asset_local.company_name, company_name)
                self.assertEqual(asset_local.quarter_end_price, price)
                self.assertEqual(asset_local.fundamental_value, fundamental_value)

                total_latent_demand_value = 0
                for i in range(1, 6):
                    investor_name = row["Investor{}".format(i)]
                    stocks_owned = int(row["StockHeld{}".format(i)])
                    latent_demand_value = float(row["LatentDemand{}".format(i)])
                    self.assertTrue(Investor.objects.filter(name=investor_name).exists())
                    asset_investor_query_set = AssetInvestors.objects.filter(
                        investor__name=investor_name,
                        asset=asset_local
                    )
                    self.assertTrue(asset_investor_query_set.exists())
                    self.assertEqual(asset_investor_query_set.count(), 1)
                    asset_investor = AssetInvestors.objects.get(investor__name=investor_name, asset=asset_local)
                    demand_value = asset_investor.latent_demand_value
                    self.assertEqual(stocks_owned, asset_investor.stocks_owned)
                    self.assertEqual(latent_demand_value, asset_investor.latent_demand_value)
                    total_latent_demand_value += demand_value

                self.assertEqual(asset_local.total_latent_demand_value, total_latent_demand_value)
