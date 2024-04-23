from datetime import date


def birthday_to_age(birthday: str) -> int:
    list_age = birthday.split('.')
    born = date(int(list_age[2]), int(list_age[1]), int(list_age[0]))
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))
