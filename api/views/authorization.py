from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from api.models import *

auth_blueprint = Blueprint('authorization', __name__)

# TODO: finish test cases for these classes


class RegisterAPI(MethodView):

    def post(self):
        post_data = request.get_json()
        user = Users.query.filter_by(username=post_data.get('username')).first()
        if not user:
            try:
                if post_data['password'] == post_data['r_password']:
                    post_data.pop('r_password')
                    post_data['joined_site'] = datetime.today().date()
                    user = Users(**post_data)
                    db.session.add(user)
                    db.session.commit()
                    # now generate the auth token
                    auth_token = user.encode_auth_token(user.id)
                    response_object = {'status': 'success',
                                      'message': 'Successfully Registered',
                                      'auth_token': auth_token.decode()
                                      }
                    return make_response(jsonify(response_object)), 201
                else:
                    response_object = {
                        'status': 'fail',
                        'message': 'Passwords do not match'
                    }
                    return make_response(jsonify(response_object)), 401
            except Exception as e:
                response_object = {
                    'status': 'fail',
                    'message': 'Failed to build user object and add to db'
                }
                return make_response(jsonify(response_object)), 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'User already exists. Please Login'
            }
            return make_response(jsonify(response_object)), 401


class LoginAPI(MethodView):
    """
    User Login Resource

    """

    def post(self):
        post_data = request.get_json()
        try:
            username = post_data.get("username")
            user = Users.query.filter_by(username=username).first()

            if user and user.password == post_data['password']:
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successful Login',
                        'auth_token': auth_token.decode(),
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'username': user.username,
                        'email': user.email,
                    }
                    return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'User Not Found'
                }
                return make_response(jsonify(response_object)), 404
        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'try again'
            }
            return make_response(jsonify(response_object)), 500


class UserAPI(MethodView):
    """
    User Resource
    """

    def get(self):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                response_object = {
                    'status': 'fail',
                    'message': 'Bearer token malformed.'
                }
                return make_response(jsonify(response_object)), 401
        else:
            auth_token = ''

        if auth_token:
            resp = Users.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = Users.query.filter_by(id=resp).first()
                response_object = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'email': user.email,
                    }
                }
                return make_response(jsonify(response_object)), 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(response_object)), 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(response_object)), 401


class LogoutAPI(MethodView):
    """
    Logout Resource
    """
    def post(self):
        # get auth token
        auth_header = request.headers.get('Authorization')
        if auth_header:
            auth_token = auth_header.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = Users.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                blacklist_token = BlacklistToken(token=auth_token)
                try:
                    # insert the token
                    db.session.add(blacklist_token)
                    db.session.commit()
                    response_obect = {
                        'status': 'success',
                        'message': 'Successfully logged out.'
                    }
                    return make_response(jsonify(response_obect)), 200
                except Exception as e:
                    response_obect = {
                        'status': 'fail',
                        'message': e
                    }
                    return make_response(jsonify(response_obect)), 200
            else:
                response_obect = {
                    'status': 'fail',
                    'message': resp
                }
                return make_response(jsonify(response_obect)), 401
        else:
            response_obect = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return make_response(jsonify(response_obect)), 403


"""
SOME NOTES

PUT: WHEN YOU WANT TO UPDATE AND EXISTING RESOURCE
POST: WHEN YOU WANT TO CREATE A NEW RESOURCE
GET: READ ONLY METHOD, GETS SOMETHING FROM THE SERVER, NOTHING CHANGES ON THE SERVER
DELETE: DOES A DELETE ON THE SERVER

"""
registration_view = RegisterAPI.as_view("register_api")
login_view = LoginAPI.as_view("login_api")
user_view = UserAPI.as_view("user_api")
logout_view = LogoutAPI.as_view("logout_api")

auth_blueprint.add_url_rule("/auth/register",
                            view_func=registration_view,
                            methods=["POST"])

auth_blueprint.add_url_rule("/auth/login",
                            view_func=login_view,
                            methods=['POST'])

auth_blueprint.add_url_rule("/auth/status",
                            view_func=user_view,
                            methods=["GET"])

auth_blueprint.add_url_rule('/auth/logout',
                            view_func=logout_view,
                            methods=['POST'])
