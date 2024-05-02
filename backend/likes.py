from datetime import date
from options import app
from pydantic import BaseModel
from database import db, Like
from functions import birthday_to_age


@app.post("/likeAnket")
def liked(data: Like):
    try:
        list_likes = list(db.child("likes").get().val()[data.userId])
    except:
        list_likes = []
    if list_likes.count(data.otheruserId):
        return data
    else:
        try:
            if list(db.child("likes").get().val()[data.otheruserId]).count(data.userId) and db.child("likes").get().val():
                try:
                    list_sympathies = list(db.child("sympathies").get().val()[data.userId])
                except:
                    list_sympathies = []
                list_sympathies.append(data.otheruserId)
                db.child("sympathies").update({data.userId: list_sympathies})
                try:
                    list_sympathies = list(db.child("sympathies").get().val()[data.otheruserId])
                except:
                    list_sympathies = []
                list_sympathies.append(data.userId)
                db.child("sympathies").update({data.otheruserId: list_sympathies})
                try:
                    notes = db.child("notifications").get().val()[data.otheruserId]
                except:
                    notes = []
                note = db.child("userInfo").child(data.userId).get().val()
                notification = {"notificationId": len(notes) + 1,
                                "message": f"У вас взаимная симпатия с {note['firstname']}, {birthday_to_age(note['birthday'])}!"}
                notes.append(notification)
                db.child("notifications").child(data.otheruserId).set(notes)
            else:
                try:
                    notes = db.child("notifications").get().val()[data.otheruserId]
                except:
                    notes = []
                note = db.child("userInfo").child(data.userId).get().val()
                notification = {"notificationId": len(notes) + 1,
                                "message": f"{note['firstname']}, {birthday_to_age(note['birthday'])} лайкнул вашу анкету!"}
                notes.append(notification)
                db.child("notifications").child(data.otheruserId).set(notes)
        except:
            pass
        list_likes.append(data.otheruserId)
        db.child("likes").update({data.userId: list_likes})
        return data


@app.post("/dislikeAnket")
def disliked(data: Like):
    try:
        list_dislikes = list(db.child("dislikes").get().val()[data.userId])
    except:
        list_dislikes = []
    for person in list_dislikes:
        if person["userId"] == data.otheruserId:
            return data
    else:
        # удаление чужого лайка
        try:
            list_likes = list(db.child("likes").get().val()[data.otheruserId])
            if list_likes.count(data.userId):
                list_likes.remove(data.userId)
                db.child("likes").update({data.otheruserId: list_likes})
        except:
            pass
        # удаление своего лайка
        try:
            list_likes = list(db.child("likes").get().val()[data.userId])
            if list_likes.count(data.otheruserId):
                list_likes.remove(data.otheruserId)
                db.child("likes").update({data.userId: list_likes})
        except:
            pass
        # добавление обоих пользователей в дизлайки
        list_dislikes.append({"userId": data.otheruserId,
                              "date": str(date.today())})
        db.child("dislikes").update({data.userId: list_dislikes})
        try:
            list_dislikes = list(db.child("dislikes").get().val()[data.otheruserId])
        except:
            list_dislikes = []
        list_dislikes.append({"userId": data.userId,
                              "date": str(date.today())})
        db.child("dislikes").update({data.otheruserId: list_dislikes})
        return data


class Contacts(BaseModel):
    telegram: str = ""
    vk: str = ""


@app.get("/userContacts/{user_id}")
def user_contacts(user_id: str):
    data = db.child(f"userInfo/{user_id}").get().val()["contacts"]
    return Contacts(**data)


class Notes(BaseModel):
    notifications: list = []


@app.get("/notificationsList/{user_id}")
def notifications_list(user_id: str):
    try:
        notes = list(db.child("notifications").child(user_id).get().val())
    except:
        notes = []
    data = Notes()
    data.notifications = notes
    return data


@app.put("/notificationsRemove/{user_id}")
def notifications_remove(user_id: str):
    db.child("notifications").remove(user_id)
    return user_id