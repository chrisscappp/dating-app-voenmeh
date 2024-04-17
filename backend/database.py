import pyrebase
from pydantic import BaseModel


firebaseConfig = {'apiKey': "AIzaSyBnV7MtU84792RY0vQRqDkrb-kfp2cEnfs",
                  'authDomain': "projectvoenmeh.firebaseapp.com",
                  'databaseURL': "https://projectvoenmeh-default-rtdb.europe-west1.firebasedatabase.app",
                  'projectId': "projectvoenmeh",
                  'storageBucket': "projectvoenmeh.appspot.com",
                  'messagingSenderId': "690203624644",
                  'appId': "1:690203624644:web:5a0fd89175ed8911ea3591",
                  'measurementId': "G-WGG27RHC91"}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()


class User(BaseModel):
    email: str
    login: str
    userId: str


class UserInfo(BaseModel):
    idToken: str = None
    userId: str
    firstname: str
    lastname: str
    sex: str
    birthday: str
    createdAt: str
    faculty: str = None
    course: str = None
    confirm: bool = False
    about: str = None
    interested: list = None
    hobbies: list = None
    contacts: list = None
    avatar: str = None


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
