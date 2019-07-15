from flask import Blueprint, jsonify


main = Blueprint('main', __name__)


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
