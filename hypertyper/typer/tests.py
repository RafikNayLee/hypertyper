from django.test import TestCase, Client
from .utils import getJSONObject
from .models import Section, Course, Lesson, Exercice, User
import json

username = 'user01'
password = "user01"
email = "user1@mail.com"
token = ''
lesson_id = None
lesson_text = "some text some text some text some text some text"

def forceLogin(c, username=username, password=password):
    response = c.post(f"/api/auth/login", {'username': username, 'password': password}, follow=True)
    data = json.loads(response.content)
    return data

class TyperTestCase(TestCase):

    def setUp(self):
        global lesson_id
        user1 = User.objects.create_user(email=email, username=username, password=password)
        course = Course.objects.create(name="Course 01")
        section = Section.objects.create(course=course, name="Section 01")
        lesson = Lesson.objects.create(course=course, section=section,name="Lesson 01", text=lesson_text)
        lesson_id = lesson.id


    def test_register(self):
        global token
        c = Client()
        username = 'user02'
        email = "user02@mail.com"
        password = "user02"
        response = c.post(f"/api/auth/register", {'username': username, 'email': email, 'password': password}, follow=True)
        data = json.loads(response.content)
        self.assertEqual(data["user"]["username"], username)
        self.assertEqual(data["user"]["email"], email)
        
        
    def test_login(self):
        global token
        global username
        global password
        c = Client()
        
        response = c.post(f"/api/auth/login", {'username': username, 'password': password}, follow=True)
        data = json.loads(response.content)
        
        self.assertEqual(data["user"]["username"], username)        
        token = data["token"]

    def test_get_lesson_succeeds(self):
        c = Client()
        forceLogin(c)
        
        response = c.get(f"/api/lessons/{lesson_id}/", follow=True)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        lesson = Lesson.objects.get(id=lesson_id)
        self.assertEqual(
            lesson.id,
            data["id"]
        )
        self.assertEqual(
            lesson.name,
            data["name"]
        )

   

    def test_get_courses_succeeds(self):
        c = Client()
        forceLogin(c)
        response = c.get("/api/courses/", follow=True)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        courses = Course.objects.all()
        self.assertEqual(len(courses), len(data))
        
    
    def test_submit_exercice_succeeds(self):
        c = Client()
        loginData = forceLogin(c)
        text = "some text text text some text some text some text"
        seconds = 60
        
        response = c.post("/api/exercices/", {
            "text": text, 
            "lesson": lesson_id, 
            "seconds": seconds,
            "user": loginData["user"]["id"]
            }, content_type="application/json",
            **{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'})
        
        response_json = json.loads(response.content)
        self.assertEqual(response.status_code, 201)
        exercice = Exercice.objects.get(id=response_json["id"])
        self.assertEqual(exercice.text, text)
       

