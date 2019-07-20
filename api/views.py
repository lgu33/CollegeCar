from flask import Blueprint, jsonify, request
from .models import db
from .models import*
from datetime import datetime


main = Blueprint('main', __name__)


@main.route('/register', methods=['POST'])
def register():
    """
    Test routes for the API
    :return:
    """
    user_data = request.get_json()
    user_data["dob"] = datetime.strptime(user_data["dob"], "%m/%d/%Y").date()
    user_data["joined_site"] = datetime.strptime(user_data["joined_site"], "%m/%d/%Y").date()
    new_user = Users(**user_data)
    db.session.add(new_user)
    db.session.commit()
    return 'Done', 201


@main.route('/login', methods=["POST", "GET"])
def login():
    colleges = ["UW-Madison"]
    return jsonify({'colleges': colleges})
