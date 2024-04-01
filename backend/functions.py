import random
import string
from database import db


def generateId() -> str:
    while True:
        idLength = 4
        text = [random.choice(string.ascii_lowercase + string.digits + string.ascii_uppercase) for i in
                range(idLength)]
        text = ''.join(text)
        for _ in db.child("user").order_by_child("id").equal_to(text).get():
            generateId()
        else:
            break
    return text
