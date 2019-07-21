# api/__init__.py
from flask import Flask
from . import config
import os
"""
NOTE: BECAUSE __INIT__.PY IS A PACKAGE, IMPORT STATEMENTS ARE RELATIVE. USE "." TO IMPORT RELATIVE TO PACKAGE
"""


def create_app():
    app = Flask(__name__)
    app_settings = os.getenv("APP_SETTINGS", 'api.config.DevelopmentConfig')

    app.config.from_object(app_settings)

    # CONSTRUCT DATABASE
    from .models import db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # IMPORT VIEWS
    from api.views.authorization import auth_blueprint
    app.register_blueprint(auth_blueprint)

    # RETURN APP
    return app


