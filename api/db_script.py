from sqlalchemy import create_engine
from sqlalchemy.exc import ProgrammingError
import os
import pandas as pd

curr_dir = os.path.dirname(os.path.realpath(__file__))
data_path = os.path.join(curr_dir, 'data')




mapped_data_path = os.path.join(data_path, 'mapped_data.xlsx')
df_mapped_data = pd.read_excel(mapped_data_path)


class Base:

    def __init__(self):
        self.BASEDIR = os.path.abspath(os.path.dirname(__file__))
        self.USERNAME = "admin"
        self.PASSWORD = "admin"
        self.PORT = 5432
        self.DB_NAME = "collegecarddb"
        self.POSTGRES_LOCAL_BASE = "postgresql://{username}:{password}@localhost:{port}/{db_name}".format(username=self.USERNAME,
                                                                                                     password=self.PASSWORD,
                                                                                                     port=self.PORT,
                                                                                                     db_name=self.DB_NAME)

        self.engine = create_engine(self.POSTGRES_LOCAL_BASE)
        self.conn = self.engine.connect()


class Users(Base):

    def __init__(self):
        super().__init__()
        id = "id integer PRIMARY KEY"
        first_name = "first_name VARCHAR(255)"
        last_name = "last_name VARCHAR(255)"
        username = "username VARCHAR(255)"
        dob = "dob DATE"
        joined_site  = "joined_site DATE"
        password = "password VARCHAR(255)"
        educational_attainment = "educational_attainment VARCHAR(255)"
        try:
            self.conn.execute("CREATE TABLE Users({id},"
                              "{first_name}, "
                              "{last_name}, "
                              "{username},"
                              "{dob},"
                              "{joined_site},"
                              "{password},"
                              "{educational_attainment}"");".format(id=id,
                                                                    first_name=first_name,
                                                                    last_name=last_name,
                                                                    username=username,
                                                                    dob=dob,
                                                                    joined_site=joined_site,
                                                                    password=password,
                                                                    educational_attainment=educational_attainment))
        except ProgrammingError:
            print('TABLE ALREADY EXISTS')


    def insert_user(self,):
        #first_name, last_name, username, dob, joined_site, password, educational_attainmen
        self.conn.execute("INSERT INTO Users(tom);")



user = Users()
user.insert_user()
print
