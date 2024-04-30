from datetime import date
import datetime
from database import auth, db, User, UserInfo


def birthday_to_age(birthday: str) -> int:
    list_age = birthday.split('.')
    born = date(int(list_age[2]), int(list_age[1]), int(list_age[0]))
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


def remove_dislikes(userId: str):
    try:
        list_dislikes = list(db.child("dislikes").get().val()[userId])
        count = 0
        for person in list_dislikes:
            if int(str(date.today() - datetime.datetime.strptime(person["date"], '%Y-%m-%d').date()).split(" ")[0]) >= 7:
                list_dislikes.pop(count)
                list_dislikes_2 = list(db.child("dislikes").get().val()[person["userId"]])
                count_2 = 0
                for person_2 in list_dislikes_2:
                    if person_2["userId"] == userId:
                        list_dislikes_2.pop(count_2)
                    count_2 += 1
                db.child("dislikes").update({person["userId"]: list_dislikes_2})
            count += 1
        db.child("dislikes").update({userId: list_dislikes})
    except:
        pass


