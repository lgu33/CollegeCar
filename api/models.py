from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from flask import current_app
import jwt


db = SQLAlchemy()


class Users(db.Model):

    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, unique=False, nullable=False)
    last_name = db.Column(db.String, unique=False, nullable=False)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=False, nullable=False)
    dob = db.Column(db.Date, unique=False, nullable=False)
    educational_attainment = db.Column(db.String, unique=False, nullable=False)
    joined_site = db.Column(db.Date, unique=False, nullable=False)

    def __init__(self, first_name, last_name, username, password, email, dob, educational_attainment, joined_site):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.email = email
        self.dob = datetime.strptime(dob, "%Y-%m-%d").date()
        self.educational_attainment = educational_attainment
        self.joined_site = joined_site

    def encode_auth_token(self, user_id):
        """
        GENERATE AN AUTH TOKEN
        :param user_id:
        :return:
        """

        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=0, seconds=5),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(payload,
                              current_app.config.get("SECRET_KEY"),
                              algorithm='HS256')

        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Validates the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'


class BlacklistToken(db.Model):
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'BlacklistTokens'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        res = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if res:
            return True
        else:
            return False


class Comments(db.Model):

    __tablename__ = "Comments"

    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)



