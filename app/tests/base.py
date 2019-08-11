from flask_testing import TestCase
from app import create_app

app = create_app()


class BaseTestCase(TestCase):
    """ Base Tests"""

    def create_app(self):
        app.config.from_object('app.config.TestingConfig')
        return app