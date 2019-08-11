import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname( __file__ ), 'data', 'tmp'))

application = app = Flask(__name__)
app.config['SECRET_KEY'] = '2f64884026723dad15ab1beeaff018fcd1bf29747ad79a2b'
# app.config['SECRET_KEY'] = os.urandom(32)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# TODO: ONE FOR TESTING, ONE FOR PROD. SET CAREFULLY
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost:5432/collegecarddb'
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']


# bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

from app import routes

