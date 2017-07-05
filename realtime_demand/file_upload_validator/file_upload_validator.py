import csv
import re
from django.forms import forms
import pandas as pd
from realtime_demand.file_upload_validator import constants
from realtime_demand.models import AssetInvestors, Asset, Investor


class UploadFile(object):
    def __init__(self, valid_fields_dict, data_file, file_name):

        if not data_file.name.endswith(".csv"):
            raise forms.ValidationError("Please upload a valid csv file")

        self.valid_fields_dict = valid_fields_dict
        self.data_file = data_file
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
            "permno": constants.NUMBER_FIELD,
            "mgrno": constants.NUMBER_FIELD,
            "comnam": constants.STRING_FIELD,
            "mgrname": constants.STRING_FIELD,
            "m": constants.NUMBER_FIELD,
            "mf": constants.NUMBER_FIELD,
            "vii": constants.NUMBER_FIELD,
            "vih": constants.NUMBER_FIELD,
            "viinv": constants.NUMBER_FIELD,
            "ticker": constants.STRING_FIELD
        }
        super(AssetFile, self).__init__(valid_fields_dict, data_file, "Asset File")

    def populate_database(self):
        self.data_file.seek(0)
        df = pd.read_csv(self.data_file)
        group_by_order = ["ticker", "comnam", "M", "MF", "viI", "viH"]
        asset_dict_investor_df = {tup[0]: tup[1] for tup in list(df.groupby(group_by_order))}
        for asset_list, investor_df in asset_dict_investor_df.iteritems():
            asset = Asset.get_or_create_using_asset_list(asset_list)
            AssetInvestors.create_asset_investors_using_df(investor_df, asset)
