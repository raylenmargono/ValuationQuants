import csv
import re
from django.forms import forms
from realtime_demand.file_upload_validator import constants
from realtime_demand.models import AssetInvestors, Asset, Investor


class UploadFile(object):
    def __init__(self, valid_fields_dict, data_file, file_name):

        if not data_file.name.endswith(".csv"):
            raise forms.ValidationError("Please upload a valid csv file")

        self.valid_fields_dict = valid_fields_dict
        self.reader = csv.DictReader(data_file)
        self.reader.fieldnames = [field.strip().lower() for field in self.reader.fieldnames]
        self.file_name = file_name
        self.validated_rows = []

    def validate_fields(self):
        valid_fields = self.valid_fields_dict.keys()
        field_names = self.reader.fieldnames
        same_length = len(valid_fields) == len(field_names)
        if set(field_names) != set(valid_fields) or not same_length:
            raise forms.ValidationError("Invalid field(s) for {}".format(self.file_name))

    def validate_entries(self):
        for row in self.reader:
            for field, validation_field in self.valid_fields_dict.iteritems():
                value = row[field].strip()
                row[field] = value
                if not re.match(validation_field, value):
                    raise forms.ValidationError("Some errors in validating the document")
            self.validated_rows.append(row)

    def populate_database(self):
        pass


class AssetFile(UploadFile):
    def __init__(self, data_file):
        valid_fields_dict = {
            "ticker": constants.STRING_FIELD,
            "company name": constants.STRING_FIELD,
            "fundamental value": constants.NUMBER_FIELD,
            "price": constants.NUMBER_FIELD
        }
        for i in range(1, 6):
            valid_fields_dict["investor{}".format(i)] = constants.STRING_FIELD
            valid_fields_dict["latentdemand{}".format(i)] = constants.NUMBER_FIELD
            valid_fields_dict["stockheld{}".format(i)] = constants.NUMBER_FIELD
        super(AssetFile, self).__init__(valid_fields_dict, data_file, "Asset File")

    def populate_database(self):
        for row in self.validated_rows:
            ticker = row["ticker"]
            asset, created = Asset.objects.get_or_create(ticker=ticker)
            asset.quarter_end_price = row["price"]
            asset.fundamental_value = row["fundamental value"]
            asset.company_name = row["company name"]
            asset.save()
            for i in range(1, 6):
                investor_name = row["investor{}".format(i)]
                stocks_owned = row["stockheld{}".format(i)]
                latent_demand = row["latentdemand{}".format(i)]
                investor, created = Investor.objects.get_or_create(name=investor_name)
                asset_investor, created = AssetInvestors.objects.get_or_create(asset=asset, investor=investor)
                asset_investor.stocks_owned = stocks_owned
                asset_investor.latent_demand_value = latent_demand
                asset_investor.save()


class InvestorFile(UploadFile):
    def __init__(self, data_file):
        valid_fields_dict = {
            "investor": constants.STRING_FIELD,
            "aum": constants.NUMBER_FIELD
        }
        super(InvestorFile, self).__init__(valid_fields_dict, data_file, "Investor File")

    def populate_database(self):
        for row in self.validated_rows:
            company_name = row["investor"]
            aum = row["aum"]
            investor, created = Investor.objects.get_or_create(name=company_name)
            investor.aum = aum
            investor.save()
