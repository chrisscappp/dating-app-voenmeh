from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import firebase, auth, db, User, UserInfo


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


@app.post("/authByEmail")
def auth_user(user: User):
    user = auth.sign_in_with_email_and_password(user.email, user.password)
    currentuser = auth.refresh(user['refreshToken'])


@app.post("/register")
def register_user(user: User, info: UserInfo):
    data_user = {"email": user.email, "login": user.login}
    data_info = {"login": user.login, "name": info.name, "sex": info.sex}
    user = auth.create_user_with_email_and_password(user.email, user.password)
    current_user = auth.refresh(user['refreshToken'])
    db.child("user").child(current_user["userId"]).set(data_user)
    db.child("userInfo").child(current_user["userId"]).set(data_info)


@app.get("/profile")
def get_profile(login: str):
    current_user = db.child("userInfo").order_by_child("login").equal_to(login).get()
    return current_user

