import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from requests import HTTPError

from database import firebase, auth, db, User, UserInfo
from functions import generateId

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


class UserLog(BaseModel):
    email: str = None
    login: str = None
    password: str


class UserReg(BaseModel):
    email: str
    login: str
    password: str
    firstname: str
    lastname: str
    sex: str
    birthday: str
    createdAt: str


class UserSelf(BaseModel):
    userId: str = None
    idToken: str = None


def auth_user(user: UserLog):
    try:
        current_user = auth.sign_in_with_email_and_password(user.email, user.password)
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
            raise HTTPException(status_code=403)
    else:
        current_user = auth.refresh(current_user['refreshToken'])
        return current_user


@app.post("/authByEmail")
def auth_user_by_email(user: UserLog):
    answer = auth_user(user)
    return answer


@app.post("/authByLogin")
def auth_user_by_login(user: UserLog):
    for _ in db.child("userInfo").order_by_child("login").equal_to(user.login).get():
        current_user = db.child("user").order_by_child("login").equal_to(user.login).get()
        for key in current_user.val():
            userid = key
        user.email = current_user.val()[userid]["email"]
        answer = auth_user(user)
        return answer
    raise HTTPException(status_code=403, detail="Invalid login")


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
            raise HTTPException(status_code=403)
    else:
        current_user = auth.refresh(current_user['refreshToken'])
        db.child("user").child(current_user["userId"]).set(data_user)
        db.child("userInfo").child(current_user["userId"]).set(data_info)
        current_user = auth.refresh(current_user['refreshToken'])
        return current_user


@app.post("/profile")
def get_profile(user: UserSelf):
    current_user = db.child("userInfo").order_by_child("userId").equal_to(user.userId).get()
    for _ in current_user:
        return current_user[0].val()
    raise HTTPException(status_code=404)


@app.put("/edit")
def edit_profile(user: UserInfo):
    db.child("userInfo").child(user.userId).update({"firstname": user.firstname, "lastname": user.lastname})
    return db.child("userInfo").order_by_child("userId").equal_to(user.userId).get()[0].val()

