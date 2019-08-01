import pandas as pd
import os
from weather import Weather, Unit

curr_dir = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(curr_dir, 'data')


def map_db_dataset():
    """
    - A FUNCTION TO READ IN DATA FROM COLLEGE SCORE CARD AND MAP THE RESPECTIVE COLUMN HEADINGS
    - 2 FILES ARE NEEDED: COLLEGE SCORE CARD DATA DICTIONARY & THE ACTUAL DATA FILE
    - THIS FUNCTION DOESNT RETURN ANYTHING, IT OUTPUTS THE MAPPED FILE

    NOTE: FUNCTION MAY TAKE A LONG TIME TO EXECUTE: THERE IS A LOT OF DATA!

    :return:
    """

    primary_data_path = os.path.join(data_path,  'MERGED2017_18_PP.csv')
    primary_data = pd.read_csv(primary_data_path)
    column_mappings_path = os.path.join(data_path, 'CollegeScorecardDataDictionary.xlsx')
    column_mappings = pd.read_excel(column_mappings_path, sheet_name="data_dictionary")
    column_name_mapping = column_mappings[["developer-friendly name", "VARIABLE NAME"]].dropna()
    column_name_mapping_list = column_name_mapping["developer-friendly name"].tolist()
    primary_data.columns = column_name_mapping_list
    mapped_data_path = os.path.join(data_path, 'mapped_data.xlsx')
    primary_data.to_excel(mapped_data_path)


def split_data_university_table(data):
    """
    A FUNCTION FOR READING IN THE MAPPED DATA (MAPPED_DATA.XLSX...PLEASE SEE FUNCTION ABOVE IF YOU DO NOT
    HAVE THE FILE) AND SPLITTING THE DATA ONLY TO PRESERVE THOSE NECESSARY FOR UNIVERSITY.


    :return:
    """

    uni_data_range = list(range(23, 99))
    university_columns = [0, 1, 2, 3, 8, 9, 11, 12, 13, 14, 15] + uni_data_range
    university_data = data.iloc[:, university_columns]

    return university_data


def split_data_local(data):
    """
    A FUNCTION FOR READING IN THE MAPPED DATA (MAPPED_DATA.XLSX...PLEASE SEE FUNCTION ABOVE IF YOU DO NOT
    HAVE THE FILE) AND SPLITTING THE DATA ONLY TO PRESERVE THOSE NECESSARY FOR LOCATION. ALSO THIS FUNCTION
    LOOKS UP THE WEATHER DATA

    :return: data table for location
    """
    data_range = [0, 1, 2] + list(range(17, 25))
    location_data = data.iloc[:, data_range]
    weather = Weather(Unit.CELSIUS)
    for index, row in location_data.iterrows():
        longitude, latitude = row['location.lon'], row['location.lat']
        lookup = weather.lookup_by_latlng(latitude, longitude)
        curr_weather = lookup.condition

    return location_data


mapped_data_path = os.path.join(data_path, 'mapped_data.xlsx')
df_mapped_data = pd.read_excel(mapped_data_path)

#df_university_table = split_data_university_table(df_mapped_data)
df_location_table = split_data_local(df_mapped_data)

print()