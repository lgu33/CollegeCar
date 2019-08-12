from app.db_script import *
from sqlalchemy import text

db_conn = Base()
# db_university = University()
# db_user = Users()


def get_entire_record_university(university_id):
    """
    :param university_id:
    :return: the entire record of the university
    """
    response = db_conn.conn.execute(" SELECT Z.*,L.type,L.city,L.state,L.county,L.timezone,"
                                    "L.irs_estimated_population_2015 FROM locations L JOIN "
                                    "(SELECT U.*,O.* FROM universities U JOIN "
                                    "(SELECT S.*, I.campus_photo FROM statistics S JOIN universityimages I "
                                    "ON(I.id=S.id)) as O ON (U.id=O.id)"
                                    " WHERE O.id = '{universityID}') as Z on (Z.zip=L.zip);".format(
                                                            universityID=university_id))
    response_items = response.fetchall()
    response_keys = response.keys()
    return response_items, response_keys


def jumbo_search_university(degree_plan, school_size, city_size, min_blk, min_annh, min_trib, min_aanipi, min_his,
                            min_nant, men_only,
                            women_only, religious, admission_scale, grants, accredited, engineer, law, buss,
                            medical, research, state):
    """
    :param degree_plan: 0 DON'T care
                        1 2-yr associates, special focus prodominant
                        2 4-year universities
    :param school_size: 0 Don't care
                        1 small
                        2 medium
                        3 large
    :param city_size:   0 DON'T CARE
                        1 small town
                        2 medium town
                        3 large town
    :param min_blk:     historically black, 1 = true, 0 = don't care
    :param min_annh:    historically annh, 1 = true, 0 = don't care
    :param min_trib:    tribal minority, 1 = true, 0 = don't care
    :param min_aanipi:  asian american native islander pacific islander, 1 = true, 0 = DONT CARE
    :param min_his:     hispanics, 1 = true, 0 = don't care
    :param min_nant:    native american non triabl institution, 1 = true, 0 = Dont care
    :param men_only:    1 = true, 0 = dont care
    :param women_only:  1 = true, 0 = dont care
    :param religious:   1 = true, 0 = dont care
    :param admission_scale: 0 = dont care
                        1 = very lenient >85%
                        2 = lenient > 70%
                        3 = middle ground 55% - 69%
                        4 = selective 40%-54%
                        5 = very selective
    :param grants:      0 = dont care, 1 = has grants
    :param accredited:  0 = dont care, 1 = accredited
    :param engineer
    :param law
    :param buss
    :param medical
    :param research     highly research focused
    :param state:       0 = dont care, use abbreviation for the rest
    :return: university names and university ID
    """
    if city_size == 0:
        city_size_max = 100000
        city_size_min = -10
    if city_size == 1:
        city_size_max = 24001
        city_size_min = -10
    if city_size == 2:
        city_size_max = 42001
        city_size_min = 24000
    if city_size == 3:
        city_size_max = 100000
        city_size_min = 42000
    # else:
        # throw error
    if degree_plan == 2:
        degree_max = 16
        degree_min = 5
    if degree_plan == 1:
        degree_max = 5
        degree_min = 0
    if degree_plan == 0:
        degree_max = 16
        degree_min = -3
    response = db_conn.conn.execute("SELECT * FROM(universities U JOIN locations L USING(zip)) JOIN statistics S "
                                        "USING(id) WHERE (L.irs_estimated_population_2015 < city_size_max)"
                                        "AND (L.irs_estimated_population_2015 > city_size_min) AND ;")


# testing done
def convert_state_to_integer(state):
    """
    converts state names into integer
    :param state: string of input state
    :return: the numerical number of state
    """
    converted = db_conn.conn.execute("SELECT id FROM states WHERE state = '{state}';".format(state=state)).fetchall()
    return converted


def convert_integer_to_state(state_int):
    """
    :param state_int: state in integer form
    :return: state in character form
    """
    converted = db_conn.conn.execute("SELECT state FROM states WHERE id = {state};".format(state=state_int)).fetchall()
    return converted


def get_university_id(university):
    """
    :param university:
    :return: one or a tuple of lists of universityID
    """
    converted = db_conn.conn.execute(text("SELECT id FROM universities WHERE name LIKE '%{university}%'"
                    .format(university=university))).fetchall()

    return converted


def find_uni_by_region(region_number):
    """
    find the university name
    :param region_number:
    :return: a list of university names, location and zip code
    """
    university_list = db_conn.conn.execute(text("SELECT name, zip, city FROM "
                                                "universities WHERE region_id = {region_number};".format(
                                                                    region_number=region_number))).fetchall()
    return university_list


def find_uni_by_zip(zip_code):
    """
    fin the university name based on zipcode
    :param zip_code: number of zip_code
    :return: list of names
    """
    university_list = db_conn.conn.execute(text("SELECT name FROM universities "
                                                "WHERE zip = {zip};".format(
                                                                    zip=zip_code))).fetchall()
    return university_list


def find_university_location_state(university_id):
    """

    :param university_id:
    :return:
    """
    pass


def find_university_zip_code(university_id):
    """

    :param university_id:
    :return:
    """
    pass


def find_university_school_population(university_id):
    """

    :param university_id:
    :return:
    """
    pass


def find_university_city_population(university_id):
    """
    :param university_id:
    :return: zip_code location population
    """
    pass


def get_university_tuition(university_id):
    """

    :return:
    """
    pass


def get_university_10_year_tuition (university_id):
    """

    :param university_id:
    :return:
    """


def join_university_and_location():
    """
    :return: the joined table between location and university
    """
    response = db_conn.conn.execute("SELECT U.* FROM Universities U JOIN Locations USING (L.zip = U.zip);".format()).fetchall()
    return response


# testing DONE
def find_university_by_state(state):
    """
    :param state: integer number of the state
    :return: list of universities in the state
    """
    response = db_conn.conn.execute("SELECT name FROM universities"
                                    " WHERE state"
                                    " = '{state}';".format(state=state)).fetchall()
    return response


def find_university_by_state_and_city(state, city):
    """""
    :param state: integer number of the state
    :param city: 
    :return: universities in the specific city and state
    """
    response = db_conn.conn.execute("SELECT U.* FROM (SELECT * FROM universities U NATURAL JOIN "
                                    "locations L USING (L.zip = U.zip) "
                                    "WHERE STATE"
                                    "= {state} WHERE city LIKE '{city}');".format(state=state, city=city))
    return response


def find_university_by_name(name):
    """
    :param name: string of user guess names
    :return: list of university with similar names
    """
    response = db_conn.conn.execute("SELECT * FROM universities WHERE name LIKE'{name}';".format(name=name))
    return response


def find_university_by_school_size(size):
    """
    :param size: int 1 = small, 2 = medium, 3 = large
    :return: list of universities with specific size
    """
    # enlarge size by 3 to fit the carnegie rating
    size_max = size * 4 + 6
    size_min = size * 4
    response = db_conn.conn.execute(text("SELECT U.* FROM universities U NATURAL JOIN "
                                    "statistics S using (U.id = S.id) WHERE "
                                         "({size_min} < S.carnegie_size_setting) ||"
                                         "(S.carnegie_size_setting <= {size_max});".format(size_min=size_min,
                                    size_max=size_max)))


def find_university_by_state_letter(state):
    """
    :param state: two letter code for the area an the state
    :return: Universitiy names within the state
    """
    stateNumber = convert_state_to_integer(state)
    stateNumber = stateNumber[0][0]
    returnedUniversities = find_university_by_state(stateNumber)
    return returnedUniversities


# Tests and stuff
# data = find_uni_by_region(5)

def get_universities_from_query_by_name(name):
    university_ids = get_university_id(name)
    k = 0
    master = []
    while k < len(university_ids):
        university_rows, university_keys = get_entire_record_university(university_ids[k]._row[0])
        try:
            master.append(dict(university_rows[0]))
        except:
            pass
        k = k+1
    return master

# for i in returnedUniversities:
#    print(returnedUniversities)
# join_university_and_location()
# university = find_university_by_zip_code(53706)

print