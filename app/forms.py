from flask_wtf import FlaskForm, Form
from wtforms import TextAreaField
from wtforms import StringField, PasswordField, SubmitField, BooleanField, IntegerField, DateField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flask_login import current_user


class RegistrationForm(FlaskForm):
    """
    A class to create a web-form for registering for the site.
    """
    first_name = StringField('First Name', validators=[DataRequired(), Length(min=2, max=100)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(min=2, max=100)])
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    dob = DateField("Date of Birth")

    choices = [("Undergraduate Student", "Undergraduate Student"), ("Bachelor's Degree", "Bachelor's Degree"),
               ("Master's Degree", "Master's Degree"), ("Doctoral Degree", "Doctoral Degree")]
    edu_attainment = SelectField("Educational Attainment", choices=choices)

    alumni_of = StringField("University Affiliation")
    submit = SubmitField('Register')

    def validate_company_email(self, company_email):
        # email = Users.query.filter_by(company_email=company_email.data).first()
        # if email:
        #     raise ValidationError("email already registered")
        pass

    def validate_username(self, username):
        # user = Users.query.filter_by(username=username.data).first()
        # if user:
        #     raise ValidationError("username taken")
        pass


class InfoChangeForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    choices = [("Undergraduate Student", "Undergraduate Student"), ("Bachelor's Degree", "Bachelor's Degree"),
               ("Master's Degree", "Master's Degree"), ("Doctoral Degree", "Doctoral Degree")]
    edu_attainment = SelectField("Educational Attainment", choices=choices)
    submit = SubmitField('Save')


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')


class UpdateAccountForm(FlaskForm):
    """
    A class to create a web-form for registering for the site.
    """
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])

    submit = SubmitField('Update')

    def validate_username(self, username):
        if username.data != current_user.username:
            user = Users.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError("username taken")

    def validate_email(self, email):
        if email.data != current_user.email:
            email = Users.query.filter_by(username=email.data).first()
            if email:
                raise ValidationError("email already registered")


class PostForm(Form):
    subject = TextAreaField(render_kw={'maxlength': 100})
    body = TextAreaField(default=" ")
    recipient = TextAreaField(render_kw={'maxlength': 20})


class RemoveRecord(FlaskForm):
    submit = SubmitField('Remove Record')


class RedditAccountConfiguration(FlaskForm):
    client_id = StringField('Account Id', validators=[DataRequired()])
    client_secret = StringField('Secret Key', validators=[DataRequired()])
    reddit_account_username = StringField('Username', validators=[DataRequired()])
    reddit_password = StringField('Password', validators=[DataRequired()])
    submit = SubmitField('Update Reddit Account Info')


class AutoMessengerSettings(FlaskForm):
    number_of_messages = IntegerField('Number of Messages to Send (int)', validators=[DataRequired()])
    sleep_time = IntegerField('Time Between Messages (seconds)', validators=[DataRequired()])
    submit = SubmitField('Begin Automatic Messaging')
