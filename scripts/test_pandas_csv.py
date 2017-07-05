import os
import pandas as pd

base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
test_data_path = "{}{}".format(base_path, "/realtime_demand/file_upload_validator/test_data")
asset_data_csv = "{}{}".format(test_data_path, "/DecomposeValuationsSimple.csv")

df = pd.read_csv(asset_data_csv)
group_by_dictionary = {tup[0]: tup[1] for tup in list(df.groupby(["ticker", "comnam", "M", "MF", "viI", "viH"]))}
for asset_list, investor_df in group_by_dictionary.iteritems():
    print asset_list

