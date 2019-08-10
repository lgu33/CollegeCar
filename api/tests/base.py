from flask_testing import TestCase
from api import create_app

app = create_app()


class BaseTestCase(TestCase):
    """ Base Tests"""

    def create_app(self):
        app.config.from_object('api.config.TestingConfig')
        return app