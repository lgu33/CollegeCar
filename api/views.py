from flask import Blueprint, jsonify
from flask_sqlalchemy import SQLAlchemy
from __init__ import app

db = SQLAlchemy(app)
main = Blueprint('main', __name__)
import db_builder


@main.route('/add_college', methods=['POST'])
def add_college():
    """
    Test routes for the API
    :return:
    """
    return 'Done', 201


@main.route('/colleges')
def colleges():
    colleges = ["UW-Madison"]
    return jsonify({'colleges': colleges})
