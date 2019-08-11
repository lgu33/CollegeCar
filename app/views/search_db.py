from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from app.models import *


class Search(MethodView):

    def get(self):
        pass


search = Search.as_view("search_api")
auth_blueprint.add_url_rule("/search",
                            view_func=search,
                            methods=["GET"])