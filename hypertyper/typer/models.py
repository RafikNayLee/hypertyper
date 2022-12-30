from django.db import models
from django.contrib.auth.models import AbstractUser

class Level(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200, primary_key=True, default="B")

class Course(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    level_code = models.CharField(max_length=200, default="B")
    locale = models.CharField(max_length=20, default="en")
    def __str__(self):
        return f"Course: {self.name}, locale: {self.locale}"

class Section(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE, related_name="sections")
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    
    @property
    def locale(self):
        return self.course.locale

    def __str__(self):
        return f"Course: {self.course.name} - Section: {self.name} "

class Lesson(models.Model):
    order_n = models.IntegerField(default=1)
    course = models.ForeignKey(Course,on_delete=models.CASCADE, related_name="lessons")
    section = models.ForeignKey(Section,on_delete=models.CASCADE, related_name="lessons")
    next_lesson = models.ForeignKey('self',on_delete=models.SET_NULL,related_name="leads",default=None, null=True, blank=True)
    name = models.CharField(max_length=200)
    text = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    min_wpm = models.IntegerField(default=0)
    min_accuracy = models.IntegerField(default=0)

    
    @property
    def locale(self):
        return self.course.locale

    @property
    def level_code(self):
        return self.course.level_code

    @property
    def nb_words(self):
        return len(self.words)
    
    @property
    def words(self):
        return self.text.split(" ")
   
    
    def __str__(self):
        return f"Course: {self.course.name} - Section: {self.section.name} - Lesson: {self.name} - Order: {self.order_n}  "
        

class User(AbstractUser):
    active=models.BooleanField(default=True)
    locale = models.CharField(max_length=20, default="en")
    @property
    def is_active(self):
        return self.active

class Exercice(models.Model):
    lesson = models.ForeignKey(Lesson,on_delete=models.CASCADE, related_name="exercices")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exercices")
    text = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    seconds = models.IntegerField(default=0)
    
    @property
    def completed(self):
        return self.lesson.min_accuracy <= self.accuracy and self.lesson.min_wpm <= self.wpm

    @property
    def locale(self):
        return self.lesson.course.locale

    @property
    def level_code(self):
        return self.lesson.course.level_code

    @property
    def minutes(self):
        return (int(self.seconds / 60))
    

    @property
    def wpm(self):
        if self.minutes <= 0:
            return self.nb_words
        return int(self.nb_words / (self.minutes))
    
    @property
    def mistakes(self):
        mistakes_list = []
        for i in range(len(self.words)):
            if self.words[i] != self.lesson.words[i]:
                mistakes_list.append(self.words[i])
        return mistakes_list
        

    @property
    def accuracy(self):
        nb_accurate_words = len(self.lesson.words) - len(self.mistakes) 
        return nb_accurate_words / len(self.lesson.words) * 100

    @property
    def nb_words(self):
        return len(self.words)

    @property
    def words(self):
        sanitized = ''.join(list(filter(lambda x: x != "\n", self.text)))
        return sanitized.split(" ")

    def __str__(self):
        return f"User: {self.user.username}, Lesson: {self.lesson.name}, Exercice: {self.id}, Duration: {self.seconds} seconds"