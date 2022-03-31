from django.db import models
from django.contrib.auth.models import AbstractUser

class Level(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200, primary_key=True, default="B")

class Course(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    level_code = models.CharField(max_length=200, default="B")

    def __str__(self):
        return self.name

class Section(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE, related_name="sections")
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', auto_now_add=True)

    def __str__(self):
        return self.name

class Lesson(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE, related_name="lessons")
    section = models.ForeignKey(Section,on_delete=models.CASCADE, related_name="lessons")
    name = models.CharField(max_length=200)
    text = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    
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
        return self.name

class User(AbstractUser):
    active=models.BooleanField(default=True)
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
    def nb_words(self):
        return len(self.words)
    

    @property
    def words(self):
        return self.text.split(" ")
    

    @property
    def mistakes(self):
        mistakes = []
        for i in range(len(self.words)):
            word = self.words[i]
            if not word == self.lesson.words[i]:
                mistakes.append(word)

        return mistakes




    def __str__(self):
        return f"User: {self.user.username}, Lesson: {self.lesson.name}, Exercice: {self.id}, Duration: {self.seconds} seconds"