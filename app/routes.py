import os
import pandas as pd
from app.queries import *
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


from app.db_script import Base, Users, University, Comment

db = Base()
user = Users()
university = University()
comment = Comment()



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


@app.route("/user_profile/<uid>", methods=["POST", "GET"])
def profile_page(uid):
    uid = int(uid)
    if not 'user' in session:
        flash("you are not logged in ")

    if session['user']['id'] == uid:
        # todo: get comments
        comments = comment.get_comments_by_user_id(uid)
        if not comments:
            comments = []
        return render_template('profile_page.html', user_profile=session['user'], comments=comments)

    new_user = user.get_user_by_id(uid)
    comments = comment.get_comments_by_user_id(uid)
    if not comments:
        comments = []

    return render_template("profile_page.html", user_profile=new_user, comments=comments)


@app.route("/", methods=["POST", "GET"])
@app.route("/search", methods=["POST", "GET"])
def search():
    if not 'user' in session:
        flash("you are not logged in ")
        return redirect(url_for('login'))
    if request.method == "POST":
        query = request.form['school_search']
        if query:
            query_data = get_universities_from_query_by_name(query)
            if not query_data:
                query_data = []
            return render_template("search_cards.html", results=query_data)
        else:
            flash("Please enter something into the search box below", 'warning')
            return render_template("search.html")

    return render_template("search.html")


@app.route("/advanced_search", methods=["POST", "GET"])
def advanced_search():
    return render_template('about.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    if 'user' in session:
        return redirect(url_for('search'))

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

        user_data = user_info
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
    if 'user' in session:
        flash('you are already logged in')
        return redirect(url_for('search'))

    form = LoginForm()
    if form.validate_on_submit():

        user_info = user.get_user_by_username(form.username.data)

        if user and form.password.data == user_info['password']:
            session['user'] = user_info
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('search'))
        else:
            flash('Login Unsuccessful.', 'danger')
    return render_template("login.html", title="Login", form=form)


@app.route("/logout")
def logout():
    if not 'user' in session:
        return render_template("login")
    del session['user']
    return redirect('/login')
