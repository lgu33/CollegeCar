import pandas as pd
from sqlalchemy import *
from flask_sqlalchemy import SQLAlchemy
from views import db


def map_db_dataset():
    """
    - A FUNCTION TO READ IN DATA FROM COLLEGE SCORE CARD AND MAP THE RESPECTIVE COLUMN HEADINGS
    - 2 FILES ARE NEEDED: COLLEGE SCORE CARD DATA DICTIONARY & THE ACTUAL DATA FILE
    - THIS FUNCTION DOESNT RETURN ANYTHING, IT OUTPUTS THE MAPPED FILE

    NOTE: FUNCTION MAY TAKE A LONG TIME TO EXECUTE: THERE IS A LOT OF DATA!

    :return:
    """
    primary_data = pd.read_csv('data/MERGED2017_18_PP.csv')
    column_mappings = pd.read_excel('data/CollegeScorecardDataDictionary.xlsx', sheet_name="data_dictionary")
    column_name_mapping = column_mappings[["developer-friendly name", "VARIABLE NAME"]].dropna()
    column_name_mapping_list = column_name_mapping["developer-friendly name"].tolist()
    primary_data.columns = column_name_mapping_list
    primary_data.to_excel("mapped_data.xlsx")


def split_data_by_relation():
    """
    A FUNCTION FOR READING IN THE MAPPED DATA (MAPPED_DATA.XLSX...PLEASE SEE FUNCTION ABOVE IF YOU DO NOT
    HAVE THE FILE) AND SPLITTING THE DATA INTO THE NECESSARY RELATIONS.


    :return:
    """
    data = pd.read_excel('data/mapped_data.xlsx')
    uni_data_range = list(range(23, 99))
    university_columns = [0, 1, 2, 3, 8, 9, 11, 12, 13, 14, 15] + uni_data_range
    university_data = data.iloc[:, university_columns]

    return


class Users(db.Model):

    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, unique=False, nullable=False)
    last_name = db.Column(db.String, unique=False, nullable=False)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=False, nullable=False)
    birthdate = db.Column(db.Date, unique=False, nullable=False)
    current_education_attainment = db.Column(db.String, unique=False, nullable=False)
    joined_site = db.Column(db.Date, unique=False, nullable=False)


class Comments(db.Model):

    __tablename__ = "Comments"

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)


db.create_all()


