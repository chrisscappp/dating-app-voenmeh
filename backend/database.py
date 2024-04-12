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
    userId: str


class UserInfo(BaseModel):
    userId: str = ""
    firstname: str
    lastname: str
    sex: str
    birthday: str
    createdAt: str = ""
    faculty: str = ""
    course: int = 0
    confirm: bool = False
    about: str = ""
    interested: list = None
    hobbies: list = None
    contacts: dict = None
    avatar: str = ""
