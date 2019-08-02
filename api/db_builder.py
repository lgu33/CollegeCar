import pandas as pd
import random as rn
import string
import os
from datetime import datetime
from weather import Weather, Unit
from sqlalchemy import create_engine
from sqlalchemy.sql import table, column, select, update, insert, func
from sqlalchemy import MetaData, Table, Column, Integer, Date, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


BASEDIR = os.path.abspath(os.path.dirname(__file__))
USERNAME = "postgres"
PASSWORD = "admin"
PORT = 5433
DB_NAME = "CollegeCardDB"
POSTGRES_LOCAL_BASE = "postgresql://{username}:{password}@localhost:{port}/{db_name}".format(username=USERNAME,
                                                                                    password=PASSWORD,
                                                                                    port=PORT,
                                                                                    db_name=DB_NAME)

curr_dir = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(curr_dir, 'data')


def create_db_conn():
    engine = create_engine(POSTGRES_LOCAL_BASE)
    connection = engine.connect()
    return connection, engine


def build_user_profiles():
    """
    A FUNCTION FOR GENERATING FAKE USER PROFILES
    :return:
    """

    NUMBER_USERS = 500
    from faker import Faker
    edu_attainment = ['Some High School',
                      'High School Degree',
                      'Undergraduate Degree',
                      'Bachelor\'s Degree',
                      'Master\'s Degree',
                      'Doctoral Degree']

    num_attainments = len(edu_attainment)
    fake = Faker()
    users = list()
    for i in range(0, NUMBER_USERS):
        name = fake.name().split()
        first_name = name[0]
        last_name = name[1]
        if len(first_name) > 3:
            username = first_name[:3] + last_name + str(rn.randint(0, 100))
        else:
            username = first_name + last_name + str(rn.randint(0, 100))
        email = fake.email()
        dob = fake.date()
        joined = datetime.today().date()
        password = ''.join([rn.choice(string.ascii_letters + string.digits) for n in range(8)])
        # STORE IN DICT
        user = dict()
        user['first_name'] = first_name
        user['last_name'] = last_name
        user['username'] = username
        user['email'] = email
        user['dob'] = dob
        user['joined_site'] = joined
        user['password'] = password
        user['educational_attainment'] = edu_attainment[rn.randint(0, num_attainments-1)]
        users.append(user)
    df = pd.DataFrame.from_dict(users)
    user_file_path = os.path.join(data_path, 'users.csv')
    df.to_csv(user_file_path, index=False)


def add_users_to_db(db_conn, engine):
    """

    :param db_conn:
    :param engine:
    :return:
    """

    metadata = MetaData(engine)
    users = Table('Users', metadata, autoload=True,
                           autoload_with=engine)

    # Get table information
    user_file_path = os.path.join(data_path, 'users.csv')
    df = pd.read_csv(user_file_path)
    df = df.to_dict('records')

    for record in df:
        record['dob'] = datetime.strptime(record['dob'], "%Y-%m-%d").date()
        record['joined_site'] = datetime.strptime(record['joined_site'], "%Y-%m-%d").date()
        i = insert(users)
        i = i.values(record)
        db_conn.execute(i)
    db_conn.close()


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


# mapped_data_path = os.path.join(data_path, 'mapped_data.xlsx')
# df_mapped_data = pd.read_excel(mapped_data_path)
#
# df_university_table = split_data_university_table(df_mapped_data)
# df_location_table = split_data_local(df_mapped_data)

db_conn, engine = create_db_conn()
# build_user_profiles()
add_users_to_db(db_conn, engine)



