from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:admin@localhost/CollegeCardDB"
    from .views import main
    app.register_blueprint(main)

    return app