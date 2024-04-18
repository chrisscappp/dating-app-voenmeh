import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from requests import HTTPError

from database import firebase, auth, db, User, UserInfo, UserLog, UserReg

app = FastAPI(
    title="Trading App"
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

'''app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["*"],
)'''


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
        auth.sign_in_with_email_and_password(user.email, user.password)
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
        return db.child("user").order_by_child("email").equal_to(user.email).get()[0].val()


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
        return db.child("user").order_by_child("email").equal_to(user.email).get()[0].val()


@app.get("/profile/{user_id}")
def get_profile(user_id: str):
    current_user = db.child("userInfo").order_by_child("userId").equal_to(user_id).get()
    for _ in current_user:
        return current_user[0].val()
    raise HTTPException(status_code=404)


@app.put("/edit/{user_id}")
def edit_profile(user_id: str, user: UserInfo):
    try:
        if not auth.get_account_info(user.idToken)["users"][0]["localId"] == user_id:
            raise HTTPException(status_code=403, detail="Invalid IP")
    except HTTPError as e:
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_ID_TOKEN":
            raise HTTPException(status_code=403, detail="Invalid id token")
    for _ in db.child("userInfo").order_by_child("userId").equal_to(user_id).get():
        db.child(f"userInfo/{user_id}").update({"firstname": user.firstname, "lastname": user.lastname,
                                                "faculty": user.faculty, "course": user.course,
                                                "about": user.about, "interested": user.interested,
                                                "hobbies": user.hobbies, "contacts": user.contacts,
                                                "avatar": user.avatar})
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