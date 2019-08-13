from app.queries import *
from app.forms import RedditAccountConfiguration, AutoMessengerSettings, RegistrationForm, LoginForm, PostForm, InfoChangeForm

from flask import render_template, flash, redirect, url_for, request, session
from sqlalchemy import create_engine
#from sqlalchemy.sql import or_, asc
from app import app
from datetime import datetime


from app.db_script import Base, Users, University, Comment

db = Base()
user = Users()
university = University()
comment = Comment()


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


@app.route("/university_page/<uid>")
def university_page(uid):
    uid = int(uid)
    if not 'user' in session:
        flash("you are not logged in")
        return redirect(url_for('login'))

    # get comments by university id
    comments = comment.get_comments_by_university_id(uid)
    if not comments:
        comments =[]

    # get all university information by university id
    university_data = get_entire_record_university(uid)
    university_data = dict(university_data[0][0])
    if not university_data:
        university_data = []

    # join university info with statistic info

    return render_template('university_page.html', result=university_data, comments=comments)


@app.route("/", methods=["POST", "GET"])
@app.route("/search", methods=["POST", "GET"])
def search():
    if not 'user' in session:
        flash("you are not logged in ")
        return redirect(url_for('login'))
    if request.method == "POST":
        return redirect(url_for('results_page', q=request.form['school_search']))
    return render_template("search.html")


@app.route("/results_page/<q>", methods=["POST", "GET"])
def results_page(q):
    query = q
    if query:
        query_data = get_universities_from_query_by_name(query)
        if not query_data:
            query_data = []
        for q in query_data:
            q["university_page_link"] = url_for('university_page', uid=q['id'])
        return render_template("search_cards.html", results=query_data)

    return redirect(url_for('search'))


@app.route("/infochange/<uid>", methods=["POST", "GET"])
def infochange(uid):
    uid = int(uid)
    if not 'user' in session:
        flash("you are not logged in ")

    form = InfoChangeForm()
    if form.validate_on_submit():

        username = form['username'].data
        email = form['email'].data
        password = form['password'].data
        attainment = form['edu_attainment'].data
        res = user.update_info(uid,username, email, password, attainment)
        if not res:
            flash("Failed to change Info")
            return render_template("info_change.html", title="Register", form=form)
        user_info = user.get_user_by_username(username)

        user_data = user_info
        session['user'] = user_data
        session['id'] = user_data['id']
        flash("Changes Saved for {}".format(user_data['username']), 'success')
        return redirect(url_for('search'))
    return render_template("info_change.html", title="InfoChange", form=form)


@app.route("/advanced_search", methods=["POST", "GET"])
def advanced_search():
    if not 'user' in session:
        flash("you are not logged in ")

    if request.method == "POST":
        # geographic
        query = {"region": request.form.get("region"),
                 "state": request.form.get("state"),
                 "city_name": request.form.get("city_name"),
                 "zip_code": request.form.get("zip_code"),
                 "admission_rate": request.form.get("admission_rate"),
                 "total_enrollment": request.form.get("total_enrollment"),
                 "cb_pred_black": request.form.get("cb_pred_black"),
                 "cb_hist_black": request.form.get("cb_hist_black"),
                 "cb_annh": request.form.get("cb_annh"),
                 "cb_tribal": request.form.get("cb_tribal"),
                 "cb_asian": request.form.get("cb_asian"),
                 "cb_hispanic": request.form.get("cb_hispanic"),
                 "cb_native": request.form.get("cb_native"),
                 "cb_men": request.form.get("cb_men"),
                 "cb_women": request.form.get("cb_women"),
                 "tuition_in_state": request.form.get("tuition_in_state"),
                 "tuition_out_state": request.form.get("tuition_out_state"),
                 "tuition_per_fte": request.form.get("tuition_per_fte"),
                 "faculty_salary": request.form.get("faculty_salary"),
                 }

    return render_template('advanced_search.html')


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
                flash("Failed to add user", 'danger')
                return render_template("new_registration.html", title="Register", form=form)
            user_info = user.get_user_by_username(username)
        else:
            flash("University name not found", 'danger')
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
        flash('you are already logged in', 'success')
        return redirect(url_for('search'))

    form = LoginForm()
    if form.validate_on_submit():
        user_info = user.get_user_by_username(form.username.data)
        if user_info and form.password.data == user_info['password']:
            session['user'] = user_info
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('search'))
        else:
            flash('User not found!', 'danger')
    return render_template("login.html", title="Login", form=form)


@app.route("/logout")
def logout():
    if not 'user' in session:
        return render_template("login")
    del session['user']
    return redirect('/login')


@app.route("/delete_user/<uid>",  methods=['GET', 'POST'])
def delete_user(uid):
    res = delete_user_by_id(uid)
    del session['user']
    flash('you have successfully deleted your account', 'success')
    return redirect(url_for("register"))
