import json
from functions import birthday_to_age
from options import app
from fastapi import HTTPException
from requests import HTTPError
from pydantic import BaseModel
from database import auth, db, User, UserInfo, UserLog, UserReg


class profiles_list(BaseModel):
    profiles: list = []


@app.get("/boys")
def profiles_male():
    if db.child("male").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("male").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/girls")
def profiles_female():
    if db.child("female").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("female").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/facultet_A")
def profiles_A():
    if db.child("А").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("А").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/facultet_O")
def profiles_O():
    if db.child("О").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("О").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/facultet_R")
def profiles_R():
    if db.child("Р").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("Р").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/facultet_I")
def profiles_I():
    if db.child("И").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("И").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/facultet_E")
def profiles_E():
    if db.child("Е").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("Е").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons


@app.get("/friends")
def profiles_friends():
    if db.child("friends").get().val() is None:
        return []
    persons = profiles_list()
    for person in db.child("friends").get().val():
        data = db.child("user").order_by_child("userId").equal_to(person).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(person).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(person).get().val()["birthday"])}
        persons.profiles.append(User(**data))
    return persons
