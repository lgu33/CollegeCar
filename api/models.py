from flask_sqlalchemy import SQLAlchemy


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


class Comments(db.Model):

    __tablename__ = "Comments"
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String)



