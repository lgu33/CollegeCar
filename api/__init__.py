from flask import Flask
from . import config

"""
NOTE: BECAUSE __INIT__.PY IS A PACKAGE, IMPORT STATEMENTS ARE RELATIVE. USE "." TO IMPORT RELATIVE TO PACKAGE
"""


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URL

    # CONSTRUCT DATABASE
    from .models import db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # IMPORT VIEWS
    from .views import main
    app.register_blueprint(main)

    # RETURN APP
    return app


