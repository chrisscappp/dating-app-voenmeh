from datetime import date
from options import app
from pydantic import BaseModel
from database import db, User


class Like(BaseModel):
    userId: str
    otheruserId: str


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

