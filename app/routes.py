import os
import pandas as pd
from app.forms import RedditAccountConfiguration, AutoMessengerSettings, RegistrationForm, LoginForm, PostForm
from flask import render_template, flash, redirect, url_for, request, session
from flask_login import login_user, current_user, logout_user, login_required
from flask import render_template, flash, redirect, url_for, request, session
from sqlalchemy import create_engine
#from flask_login import login_user, current_user, logout_user, login_required
#from sqlalchemy.sql import or_, asc
from app import app
from werkzeug.exceptions import HTTPException
from werkzeug.utils import secure_filename
#from app import app, bcrypt, logger
#from app.forms import RedditAccountConfiguration, AutoMessengerSettings, RegistrationForm, LoginForm, PostForm
from datetime import datetime


from app.db_script import Base, Users, University

db = Base()
user = Users()
university = University()



# @app.before_first_request
# def init_app():
#     """
#     LOAD ALL NECESSARY SESSION VARIABLES HERE
#     :return:
#     """
#     # email_manager = EmailManager()
#     # email_manager.start_wan_writer()
#     # email_manager.start_email_engine()
#     # logger.info('EMAIL MANAGER STARTED')


@app.route("/about")
def about():
    """
    ROUTE FOR THE ABOUT PAGE

    :return:
    """
    # TODO: move out of here

    return render_template("about.html")


@app.route("/", methods=["POST", "GET"])
@app.route("/search", methods=["POST", "GET"])
def search():
    
    return render_template("about.html")


@app.route("/register", methods=['GET', 'POST'])
def register():
    # if current_user.is_authenticated:
    #     return redirect('/')
    form = RegistrationForm()
    if form.validate_on_submit():
        id = university.get_university_id_from_name(str(form['alumni_of'].data))
        if id > -1:
            first_name = form['first_name'].data
            last_name = form['last_name'].data
            username = form['username'].data
            email = form['email'].data
            password = form['password'].data
            dob = form['dob'].data
            joined_site = str(datetime.today().date())
            attainment = form['edu_attainment'].data
            alumni_of = id
            res = user.insert_user(first_name, last_name, username, email, password, joined_site, dob, attainment, alumni_of)
            if not res:
                flash("Failed to add user")
                return render_template("new_registration.html", title="Register", form=form)
            user_info = user.get_user_by_username(username)
        else:
            flash("University name not found")
            return render_template("new_registration.html", title="Register", form=form)

        user_data = dict(user_info.first())
        session['user'] = user_data
        session['id'] = user_data['id']
        flash("Account created for {}".format(user_data['username']), 'success')
        return redirect(url_for('search'))
    return render_template("new_registration.html", title="Register", form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    """
    ROUTE FOR LOGGING IN

    :return:
    """

    if current_user.is_authenticated:
        return redirect(url_for('reddit_scraper'))
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            # session['number'] = consequent_integers.next()
            login_user(user, remember=form.remember.data)

            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('search'))
        else:
            flash('Login Unsuccessful.', 'danger')

    return render_template("login.html", title="Login", form=form)


@app.route("/logout")
def logout():
    logout_user()
    return redirect('/')
#
#
# @app.route("/account")
# @login_required
# def account():
#     """
#     ROUTE FOR VIEW ACCOUNT
#
#     :return:
#     """
#
#     return render_template('account.html', title='Account')





# @app.route('/uploader', methods=['GET', 'POST'])
# @login_required
# def upload_file():
#     if request.method == 'POST':
#         try:
#             file = request.files['file']
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
#                 if not os.path.isdir(app.config["UPLOAD_FOLDER"]):
#                     os.makedirs(app.config["UPLOAD_FOLDER"])
#                 file.save(file_path)
#                 flash('File Uploaded Successfully', 'success')
#                 data = read_uploaded_file(file_path)
#                 add_keywords_to_db(data)
#                 delete_unused_primary_keys()
#         except HTTPException:
#             flash('Failed Upload. Are you sure you selected the correct file?', 'warning')
#             redirect('company_portal')
#     return redirect('company_portal')





