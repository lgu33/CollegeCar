import pandas as pd
import random as rn
import string
import os
from datetime import datetime
from weather import Weather, Unit
from sqlalchemy import create_engine
from sqlalchemy.sql import table, column, select, update, insert, func
from sqlalchemy import MetaData, Table, Column, Integer, Date, String
from google_images_download import google_images_download
from essential_generators import DocumentGenerator


BASEDIR = os.path.abspath(os.path.dirname(__file__))
USERNAME = "postgres"
PASSWORD = "admin"
PORT = 5432
DB_NAME = "CollegeCardDB"
POSTGRES_LOCAL_BASE = "postgresql://{username}:{password}@localhost:{port}/{db_name}".format(username=USERNAME,
                                                                                    password=PASSWORD,
                                                                                    port=PORT,
                                                                                    db_name=DB_NAME)

curr_dir = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(curr_dir, 'db_data')


def get_mapped_data():
    path = os.path.join(data_path, 'mapped_data.xlsx')
    return pd.read_excel(path)


def get_users():
    path = os.path.join(data_path, 'users.csv')
    return pd.read_csv(path)


def get_universities():
    path = os.path.join(data_path, 'university_data.csv')
    return pd.read_csv(path)


def create_db_conn():
    engine = create_engine(POSTGRES_LOCAL_BASE)
    connection = engine.connect()
    return connection, engine


def build_financial_statistics_table():
    df_mapped_data = get_mapped_data()
    e_cols = list(range(316, 384))
    cols = [0] + e_cols
    financials_table = df_mapped_data.iloc[:, cols]
    financials_table.columns = [i.replace(".", "_") for i in financials_table.columns.tolist()]
    file_path = os.path.join(data_path, 'financial_statistics.csv')
    financials_table.to_csv(file_path)


def build_ethnic_statistics_table():
    df_mapped_data = get_mapped_data()
    e_cols = list(range(26,38)) + list(range(292,313))
    cols = [0] + e_cols
    ethnics_table = df_mapped_data.iloc[:, cols]
    ethnics_table.columns = [i.replace(".", "_") for i in ethnics_table.columns.tolist()]
    file_path = os.path.join(data_path, 'ethnic_statistics.csv')
    ethnics_table.to_csv(file_path)


def build_universities_table():
    df_mapped_data = get_mapped_data()
    # uni_data_range = list(range(23, 99))
    university_columns = [0, 1, 2, 3, 8, 9, 12, 13]
    university_data = df_mapped_data.iloc[:, university_columns]


def states_table():
    df_mapped_data = get_mapped_data()
    states = set(df_mapped_data['state'].tolist())
    df = pd.DataFrame(list(states))
    file_path = os.path.join(data_path, 'states.csv')
    df.to_csv(file_path)


def location_table():
    df_mapped_data = get_mapped_data()
    university_columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 18]
    university_data = df_mapped_data.iloc[:, university_columns]

    f_path = os.path.join(data_path, "zip_code_database.csv")
    location_data = pd.read_csv(f_path)
    states_p = os.path.join(data_path, 'states.csv')
    states = pd.read_csv(states_p)
    for i, value in location_data.iterrows():
        match = states[states['state'] == value['state']]
        id = int(match['id'].values[0])
        location_data.at[i, "state"] = id
        #university_data.loc[university_data['state'] == value['state'], "state"] = id
    university_data['zip'] = university_data['zip'].str.split("-").str[0]
    location_data.to_csv(os.path.join(data_path, 'location.csv'))
    university_data.to_csv(os.path.join(data_path, 'university_data.csv'))


def build_user_comments():
    users = get_users()

    num_users = len(users)
    num_universities = len(users['university_id'])

    num_comments = 50000
    gen = DocumentGenerator()
    master = []
    for comm in range(num_comments):
        records = {}
        rand_university = rn.randint(0, num_universities - 1)
        rand_user = rn.randint(1, num_users - 1)
        comment = gen.sentence()
        university_id = users.iloc[rand_university]['university_id']
        records['comment'] = comment
        records['university_id'] = university_id
        records['user_id'] = rand_user
        master.append(records)
    temp = pd.DataFrame(master)
    file_path = os.path.join(data_path, 'comments.csv')
    temp.to_csv(file_path)


def build_user_profiles():
    """
    A FUNCTION FOR GENERATING FAKE USER PROFILES
    :return:
    """

    df_mapped_data = get_mapped_data()
    filter_by_major_inst = df_mapped_data[df_mapped_data['carnegie_size_setting'] > 12]
    uids = filter_by_major_inst['id'].tolist()
    NUMBER_USERS = 25000
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
            username = first_name[:3] + last_name + str(rn.randint(0, 1000000))
        else:
            username = first_name + last_name + str(rn.randint(0, 1000000))
        email = fake.email()
        dob = fake.date()
        joined = fake.date()
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
        user['university_id'] = int(filter_by_major_inst.iloc[rn.randint(0, len(uids) - 1)]['id'])
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
    users = Table('Users', metadata, autoload=True, autoload_with=engine)

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


def get_image_url(query):
    # keywords is the search query
    # format is the image file format
    # limit is the number of images to be downloaded
    # print urs is to print the image file url
    # size is the image size which can
    # be specified manually ("large, medium, icon")
    # aspect ratio denotes the height width ratio
    # of images to download. ("tall, square, wide, panoramic")
    response = google_images_download.googleimagesdownload()
    arguments = {"keywords": query,
                 "no_download": True,
                 "format": "jpg",
                 "limit": 1,
                 "print_urls": True,
                 "size": "large",
                 "aspect_ratio": "panoramic"}

    res = 'NO IMAGE FOUND'
    try:
        res = response.download(arguments)

        # Handling File NotFound Error
    except FileNotFoundError:
        arguments = {"keywords": query,
                     "format": "jpg",
                     "limit": 1,
                     "print_urls": True,
                     "size": "large"}

        # Providing arguments for the searched query
        try:
            # Downloading the photos based
            # on the given arguments
            res = response.download(arguments)
        except:
            pass

    return res


def create_image_links(data):
    df_university_uid_data = data[['id', 'ope8_id', 'name']]
    master_df = pd.DataFrame()
    for id, row in df_university_uid_data.iterrows():
        name = row['name'].lower()
        link = get_image_url(name.lower())
        try:
            row['campus_photo'] = link[0][name][0]
        except IndexError as e:
            row['campus_photo'] = 'NO IMAGE FOUND'
        master_df = master_df.append(row)
    master_df.to_csv(os.path.join(data_path, 'university_image_links.csv'))


def create_friends_relationship():
    users = get_users()
    num_users = len(users)
    MAX_FRIENDS = 20
    friends = []
    for i in range(1, num_users + 1):
        num_friends = rn.randint(1, MAX_FRIENDS)
        for j in range(num_friends):
            random_friend = rn.randint(1, num_users)
            while random_friend == i:
                random_friend = rn.randint(1, num_users)
            friends.append((i, random_friend))

    df = pd.DataFrame(friends, columns=['user_id', 'friend_id'])
    f_path = os.path.join(data_path, "user_friends.csv")
    df.to_csv(f_path)


def create_universities_subscriptions():
    users = get_users()
    universities = get_universities()
    num_users = int(len(users) * .25)
    num_universities = len(universities)
    max_subscriptions = 10

    subs = []
    for i in range(1, num_users + 1):
        num_subs = rn.randint(1, max_subscriptions)
        curr_subs = []
        for j in range(num_subs):
            random_sub = rn.randint(0, num_universities - 1)
            uid = int(universities.iloc[random_sub]['id'])
            curr_subs.append((i, uid))
        curr_subs = list(set(curr_subs))
        subs = subs + curr_subs

    df = pd.DataFrame(subs, columns=['user_id', 'university_id'])
    f_path = os.path.join(data_path, "university_subscriptions.csv")
    df.to_csv(f_path)





# db_conn, engine = create_db_conn()
# df_mapped_data = get_mapped_data()
# create_image_links(df_mapped_data)
# map_db_dataset()
# df_university_table = split_data_university_table(df_mapped_data)
# df_location_table = split_data_local(df_mapped_data)
# build_user_profiles()
# add_users_to_db(db_conn, engine)
#build_ethnic_statistics_table()
#build_financial_statistics_table()
# build_universities_table()
# create_universities_subscriptions()