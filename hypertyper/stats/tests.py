from django.test import TestCase, Client
from typer.models import Section, Course, Lesson, Exercice, User
import json

username = 'user01'
password = "user01"
email = "user1@mail.com"
token = ''
lesson_id = None
lesson_id_2 = None
lesson_id_3 = None
lesson_text = "some text some text some text some text some text"


def forceLogin(c, username=username, password=password):
    response = c.post(f"/api/auth/login", {'username': username, 'password': password}, follow=True)
    data = json.loads(response.content)
    return data

class TyperTestCase(TestCase):

    def setUp(self):
        global lesson_id
        global lesson_id_2
        global lesson_id_3


        user1 = User.objects.create_user(email=email, username=username, password=password)
        course = Course.objects.create(name="Course 01")
        section = Section.objects.create(course=course, name="Section 01")
        lesson = Lesson.objects.create(course=course, section=section,name="Lesson 01", text=lesson_text)
        lesson_id = lesson.id
        Exercice.objects.create(lesson=lesson, user=user1, text=lesson_text, seconds=60)
        lesson2 = Lesson.objects.create(course=course, section=section,name="Lesson 02", text=lesson_text)
        lesson_id_2 = lesson2.id

        Exercice.objects.create(lesson=lesson2, user=user1, text=lesson_text, seconds=180)
        Exercice.objects.create(lesson=lesson2, user=user1, text=lesson_text, seconds=360)

        lesson3 = Lesson.objects.create(course=course, section=section,name="Lesson 03", text=lesson_text)
        lesson_id_3 = lesson3.id
        

    def test_get_nb_exercices(self):
        c = Client()
        loginData = forceLogin(c)        
        response = c.get(f"/stats/nb_exercices",data={"lesson": lesson_id},**{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'}, follow=True)        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["nb_exercices"], 1)
        response = c.get(f"/stats/nb_exercices",data={"lesson": lesson_id_2},**{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'}, follow=True)        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["nb_exercices"], 2)

    def test_high_score_wpm_succeeds(self):
        c = Client()
        loginData = forceLogin(c)        
        response = c.get(f"/stats/high_score_wpm",data={"lesson": lesson_id_2},**{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'}, follow=True)        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["high_score"], 3)

    def test_high_score_wpm_zero_exercices(self):
        c = Client()
        loginData = forceLogin(c)        
        response = c.get(f"/stats/high_score_wpm",data={"lesson": lesson_id_3},**{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'}, follow=True)        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["high_score"], 0)


    def test_user_progress(self):
        c = Client()
        loginData = forceLogin(c)        
        response = c.get(f"/stats/user_progress",**{'HTTP_AUTHORIZATION': f'Token {loginData["token"]}'}, follow=True)        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data["progression"], 66.67)
        
        

    
