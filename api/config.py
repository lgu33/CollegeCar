"""

CONFIG FILE FOR THE WEB APPLICATION
PLEASE PUT ALL HIGHER LEVEL / GLOBAL APPLICATION DEFINITIONS IN HERE

ADOPTED FROM THE FOLLOWING TUTORIAL:
https://github.com/realpython/flask-jwt-auth/blob/master/project/server/config.py

"""

import os


BASEDIR = os.path.abspath(os.path.dirname(__file__))
USERNAME = "postgres"
PASSWORD = "admin"
PORT = 5433
DB_NAME = "CollegeCardDB"
POSTGRES_LOCAL_BASE = "postgresql://{username}:{password}@localhost:{port}/".format(username=USERNAME,
                                                                                    password=PASSWORD,
                                                                                    port=PORT)


class BaseConfig:
    SECRET_KEY = '\x08E\x80B\x1b\x94\xef)\xf4\xd0\x85\x0c\xa2g\x96\x98\xdc\xfd\xc0\xe7\xad!\xf7'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    SQL_TRACK_MODIFCATIONS = False
    CORS_HEADERS = "Content-Type"


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = POSTGRES_LOCAL_BASE + DB_NAME


class TestingConfig(BaseConfig):
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = POSTGRES_LOCAL_BASE + DB_NAME
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(BaseConfig):
    SECRET_KEY = '\x08E\x80B\x1b\x94\xef)\xf4\xd0\x85\x0c\xa2g\x96\x98\xdc\xfd\xc0\xe7\xad!\xf7'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = POSTGRES_LOCAL_BASE + DB_NAME