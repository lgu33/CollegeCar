"""

ALL TESTS FOR THE AUTHORIZATION ROUTES GO HERE

"""
import random
import string
import json
import unittest
from api.tests.base import BaseTestCase

# TODO: FINISH TEST CASES https://realpython.com/token-based-authentication-with-flask/


def build_test_user():
    letters = string.ascii_lowercase
    username = ''.join(random.choice(letters) for i in range(10))
    test_user = {
        "first_name": "test_name_1",
        "last_name": "test_last_name_2",
        "username": username,
        "password": "admin",
        "email": "nburmeister@gmail.com",
        "dob": "2019-7-30",
        "educational_attainment": "college",
        "joined_site": "2019-7-30",
    }
    return test_user


class TestAuthBlueprint(BaseTestCase):

    def test_registration(self):
        """
        TEST: test user registration
        """
        with self.client:
            # NOTE: WE GENERATE A RANDOM USERNAME TO MAKE SURE WE
            # DON'T GET ANY CONFLICTS UPON INSERT
            test_user = build_test_user()
            response = self.register_user(test_user)
            data = json.loads(response.data.decode())
            self.assert_successful_register(data, response)

    def test_registered_user_login(self):
        """
        TEST: test user register, and subsequent login
        :return:
        """
        with self.client:
            test_user = build_test_user()
            response = self.register_user(test_user)
            data = json.loads(response.data.decode())
            self.assert_successful_register(data, response)
            # NOW LOGIN
            login_reponse = self.login_user(test_user)
            login_data = json.loads(login_reponse.data.decode())
            self.assert_successful_login(login_data, login_reponse)

    def test_non_registered_user_login(self):
        """
        TEST: test for the login of a non user
        :return:
        """
        with self.client:
            test_user = build_test_user()
            login_response = self.login_user(test_user)
            login_data = json.loads(login_response.data.decode())
            self.assert_non_user_login_failure(login_data, login_response)

    def test_user_status(self):
        """
        TEST: in order to get the details of the currently logged in user, the auth token
        must be sent with the request within the header
        :return:
        """
        # 1 login some random user
        test_user = build_test_user()
        reg_response = self.register_user(test_user)
        response = self.client.get("/auth/status",
                                   headers=dict(Authorization="Bearer " + json.loads(
                                       reg_response.data.decode())['auth_token']))
        data = json.loads(response.data.decode())

        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['data'] is not None)
        self.assertTrue(data['data']['email'] == test_user['email'])
        self.assertEqual(response.status_code, 200)



    def assert_successful_register(self, data, response):
        self.assertTrue(data['status'] == 'success')
        self.assertTrue(data['message'] == 'Successfully Registered')
        self.assertTrue(data['auth_token'])
        self.assertTrue(response.content_type == 'application/json')
        self.assertEqual(response.status_code, 201)

    def assert_successful_login(self, login_data, login_reponse):
        self.assertTrue(login_data['status'] == 'success')
        self.assertTrue(login_data['message'] == 'Successful Login')
        self.assertTrue(login_data['auth_token'])
        self.assertTrue(login_reponse.content_type == 'application/json')
        self.assertEqual(login_reponse.status_code, 200)

    def assert_non_user_login_failure(self, login_data, login_response):
        self.assertTrue(login_data['status'] == 'fail')
        self.assertTrue(login_data['message'] == 'User Not Found')
        self.assertTrue(login_response.content_type == 'application/json')
        self.assertEqual(login_response.status_code, 404)

    def register_user(self, test_user):
        return self.client.post(
            '/auth/register',
            data=json.dumps(test_user),
            content_type='application/json',
        )

    def login_user(self, test_user):
        return self.client.post('auth/login',
                               data=json.dumps(test_user),
                               content_type='application/json')


if __name__ == '__main__':
    unittest.main()