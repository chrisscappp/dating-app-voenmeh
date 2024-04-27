import json

import auth
import profiles

from options import app
from fastapi import HTTPException
from pydantic import BaseModel
from requests import HTTPError
from database import auth, db, User, UserInfo


@app.get("/profile/{user_id}")
def get_profile(user_id: str):
    current_user = db.child("userInfo").order_by_child("userId").equal_to(user_id).get()
    for _ in current_user:
        return current_user[0].val()
    raise HTTPException(status_code=404)


@app.put("/edit/{user_id}")
def edit_profile(user_id: str, user: UserInfo):
    for _ in db.child("userInfo").order_by_child("userId").equal_to(user_id).get():
        db.child(f"userInfo/{user_id}").update({"firstname": user.firstname, "lastname": user.lastname,
                                                "faculty": user.faculty, "course": user.course,
                                                "about": user.about, "interested": user.interested,
                                                "hobbies": user.hobbies, "contacts": user.contacts,
                                                "avatar": user.avatar})
        # добавление в список факультетов
        if user.faculty is not None:
            list_faculties = ["А", "О", "Р", "И", "Е"]
            list_faculties.remove(user.faculty)
            for faculty in list_faculties:
                if not db.child(faculty).order_by_value().equal_to(user_id).get().val() == []:
                    db.child(faculty).order_by_value().equal_to(user_id).remove()
            if db.child(user.faculty).order_by_value().equal_to(user_id).get().val() == []:
                data = [user_id]
                try:
                    data = db.child(user.faculty).get().val() + data
                    db.child(user.faculty).set(data)
                except:
                    db.child(user.faculty).set(data)
        # добавление в список друзей
        if user.interested.count("friends") and not db.child("friends").order_by_value().equal_to(
                user_id).get().val() == []:
            pass
        elif user.interested.count("friends") and db.child("friends").order_by_value().equal_to(
                user_id).get().val() == []:
            data = [user_id]
            try:
                data = db.child("friends").get().val() + data
                db.child("friends").set(data)
            except:
                db.child("friends").set(data)
        elif not user.interested.count("friends") and db.child("friends").order_by_value().equal_to(
                user_id).get().val() == []:
            pass
        else:
            data = list(db.child("friends").get().val())
            data.remove(user_id)
            db.child("friends").set(data)
        return db.child("userInfo").order_by_child("userId").equal_to(user_id).get()[0].val()
    raise HTTPException(status_code=404)


class DataDelete(BaseModel):
    password: str
    repeatPassword: str


@app.delete("/removeProfile/{user_id}")
def delete_profile(user_id: str, user: DataDelete):
    if user.password != user.repeatPassword:
        raise HTTPException(status_code=403, detail="Passwords must be identical")
    try:
        email = db.child("user").child(user_id).get()[0].val()
        current_user = auth.sign_in_with_email_and_password(email, user.password)
        auth.delete_user_account(current_user['idToken'])
        # удаление из списка факультетов
        try:
            faculty = db.child("userInfo").child(user_id).get().val()["faculty"]
            if not faculty is "":
                data = list(db.child(faculty).get().val())
                data.remove(user_id)
                db.child(faculty).set(data)
        except:
            pass
        # удаление из списка друзей
        try:
            data = list(db.child("userInfo").child(user_id).get().val()["interested"])
            if data.count("friends") and not db.child("friends").order_by_value().equal_to(user_id).get().val() == []:
                data = list(db.child("friends").get().val())
                data.remove(user_id)
                db.child("friends").set(data)
        except:
            pass
        # удаление из списка по полу
        sex = db.child("userInfo").child(user_id).get().val()["sex"]
        data = list(db.child(sex).get().val())
        data.remove(user_id)
        db.child(sex).set(data)
        db.child("user").child(user_id).remove()
        db.child("userInfo").child(user_id).remove()
    except HTTPError as e:
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_EMAIL":
            raise HTTPException(status_code=403, detail="Invalid email")
        if error == "INVALID_LOGIN_CREDENTIALS":
            raise HTTPException(status_code=403, detail="Invalid login credentials")
        if error == """TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due
                    to many failed login attempts. You can immediately restore it by resetting your password
                    or you can try again later.""":
            raise HTTPException(status_code=403, detail="Too many attempts")
    return user


class DataReset(BaseModel):
    password: str


@app.put("/changePassword/{user_id}")
def change_password(user_id: str, user: DataReset):
    try:
        email = db.child("user").child(user_id).get()[0].val()
        auth.sign_in_with_email_and_password(email, user.password)
    except HTTPError as e:
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_EMAIL":
            raise HTTPException(status_code=403, detail="Invalid email")
        if error == "INVALID_LOGIN_CREDENTIALS":
            raise HTTPException(status_code=403, detail="Invalid login credentials")
        if error == """TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due
                    to many failed login attempts. You can immediately restore it by resetting your password
                    or you can try again later.""":
            raise HTTPException(status_code=403, detail="Too many attempts")
    auth.send_password_reset_email(email)