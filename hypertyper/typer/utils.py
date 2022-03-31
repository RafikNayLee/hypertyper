

def getJSONObject(obj, type):
    if type == "exercice":
        return {
            "text": obj.text,
            "seconds": obj.seconds,
            "minutes": obj.minutes,
            "id": obj.id,
            "wpm": obj.wpm,
            "nb_words": obj.nb_words,
            "lesson_nb_words": obj.lesson.nb_words,
            "mistakes": obj.mistakes
        }
    elif type == "lesson":
        return {
            "id": obj.id,
            "name": obj.name,
            "text": obj.text,
            "section": obj.section.name,
            "course": obj.course.name,
            "nb_words": obj.nb_words
        }
    elif type == "section":
        result = {"name": obj.name}
        result["lessons"] = []
        for lesson in obj.lessons.all():
            result["lessons"].insert(0, getJSONObject(lesson, "lesson"))
        return result
    elif type == "course":
        result = {"name": obj.name}
        result["sections"] = []
        for section in obj.sections.all():
            result["sections"].insert(0, getJSONObject(section, "section"))
        return result
    else:
        return obj