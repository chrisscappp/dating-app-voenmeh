from functions import birthday_to_age
from options import app
from pydantic import BaseModel
from database import db, User
from random import shuffle


class profiles_list(BaseModel):
    profiles: list = []


def get_profiles(name: str, user_id: str):
    if db.child(name).get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child(name).get().val():
        if person == user_id:
            continue
        try:
            list_likes = db.child("likes").get().val()[user_id]
        except:
            list_likes = []
        if not list_likes.count(person):
            try:
                list_dislikes = list(db.child("dislikes").get().val()[user_id])
                flag = False
                for person_2 in list_dislikes:
                    if person == person_2["userId"]:
                        flag = True
                        continue
                if flag is True:
                    continue
            except:
                pass
            data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
                db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
                {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
            shuffle(persons.profiles)
            persons.profiles.append(User(**data))
    return persons


@app.get("/boys/{user_id}")
def profiles_male(user_id: str):
    return get_profiles("male", user_id)


@app.get("/girls/{user_id}")
def profiles_female(user_id: str):
    return get_profiles("female", user_id)


@app.get("/facultet_a/{user_id}")
def profiles_A(user_id: str):
    return get_profiles("А", user_id)


@app.get("/facultet_o/{user_id}")
def profiles_O(user_id: str):
    return get_profiles("О", user_id)


@app.get("/facultet_r/{user_id}")
def profiles_R(user_id: str):
    return get_profiles("Р", user_id)


@app.get("/facultet_i/{user_id}")
def profiles_I(user_id: str):
    return get_profiles("И", user_id)


@app.get("/facultet_e/{user_id}")
def profiles_E(user_id: str):
    return get_profiles("Е", user_id)


@app.get("/friends/{user_id}")
def profiles_friends(user_id: str):
    return get_profiles("friends", user_id)


@app.get("/likedAnkets/{user_id}")
def likes(user_id: str):
    try:
        list_likes = db.child("likes").get().val()[user_id]
    except:
        list_likes = []
    persons = profiles_list()
    for person in list_likes:
        try:
            list_likes_2 = db.child("likes").get().val()[person]
        except:
            list_likes_2 = []
        if list_likes_2.count(user_id):
            continue
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/sympathies/{user_id}")
def sympathies(user_id: str):
    try:
        list_likes = db.child("likes").get().val()[user_id]
    except:
        list_likes = []
    persons = profiles_list()
    for person in db.child("likes").get().val():
        try:
            list_likes_2 = (db.child("likes").get().val()[person])
        except:
            list_likes_2 = []
        if list_likes_2.count(user_id):
            if list_likes.count(person):
                continue
            data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
                   db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
                   {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
            persons.profiles.append(User(**data))
    return persons


@app.get("/myFriends/{user_id}")
def friends(user_id: str):
    try:
        list_likes = db.child("sympathies").get().val()[user_id]
    except:
        list_likes = []
    persons = profiles_list()
    for person in list_likes:
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons
