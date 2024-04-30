import json
from functions import birthday_to_age, remove_dislikes
from options import app
from fastapi import HTTPException
from requests import HTTPError

from database import auth, db, UserEdit, UserInfo, UserLog, UserReg


@app.post("/auth")
def auth_user(user: UserLog):
    if db.child("user").order_by_child("email").equal_to(user.email).get().val() == []:
        if db.child("userInfo").order_by_child("login").equal_to(user.login).get().val() == []:
            raise HTTPException(status_code=403, detail="Invalid login or email")
        else:
            current_user = db.child("user").order_by_child("login").equal_to(user.login).get()
            for key in current_user.val():
                userid = key
            user.email = current_user.val()[userid]["email"]
    try:
        current_user = auth.sign_in_with_email_and_password(user.email, user.password)
        current_user = auth.refresh(current_user['refreshToken'])
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
    else:
        remove_dislikes(current_user["userId"])
        data = db.child("user").order_by_child("userId").equal_to(current_user["userId"]).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(current_user["userId"]).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(current_user["userId"]).get().val()["birthday"])}
        return User(**data)


@app.post("/register")
def register_user(user: UserReg):
    for _ in db.child("userInfo").order_by_child("login").equal_to(user.login).get():
        raise HTTPException(status_code=403, detail="Login already exists")
    try:
        current_user = auth.create_user_with_email_and_password(user.email, user.password)
        current_user = auth.refresh(current_user['refreshToken'])
        data_user = {"email": user.email, "userId": current_user["userId"], "login": user.login}
        data_info = {"userId": current_user["userId"], "login": user.login, "sex": user.sex,
                     "birthday": user.birthday, "createdAt": user.createdAt, "firstname": user.firstname,
                     "lastname": user.lastname}
    except HTTPError as e:
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_EMAIL":
            raise HTTPException(status_code=403, detail="Invalid email")
        if error == "EMAIL_EXISTS":
            raise HTTPException(status_code=403, detail="Email already exists")
        if error == "WEAK_PASSWORD : Password should be at least 6 characters":
            raise HTTPException(status_code=403, detail="Week password")
    else:
        current_user = auth.refresh(current_user['refreshToken'])
        db.child("user").child(current_user["userId"]).set(data_user)
        db.child("userInfo").child(current_user["userId"]).set(data_info)
        # добавление в списки по полу
        if db.child(user.sex).get().val() is None:
            db.child(user.sex).set([current_user["userId"]])
        else:
            data = list(db.child(user.sex).get().val())
            data.append(current_user["userId"])
            db.child(user.sex).set(data)
        data = db.child("user").order_by_child("userId").equal_to(user_id).get()[0].val() | \
               db.child("userInfo").order_by_child("userId").equal_to(user_id).get()[0].val() | \
               {"age": birthday_to_age(db.child("userInfo").child(user_id).get().val()["birthday"])}
        return UserEdit(**data)
