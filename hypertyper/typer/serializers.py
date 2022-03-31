from rest_framework import serializers

from .models import Lesson, Course, Section, Exercice, Level

class ExerciceSerializer(serializers.ModelSerializer):
    lesson_name = serializers.SlugField(source="lesson", required=False)
    user_name = serializers.SlugField(source="user", required=False)
    
    class Meta:
        model = Exercice
        fields = ['id', 'text', 'pub_date', 'words', 'nb_words', 'lesson', 'lesson_name', 'user', 'user_name', 'seconds', 'minutes', 'wpm', 'mistakes', 'level_code']

class LessonSerializer(serializers.ModelSerializer):
    section_name = serializers.SlugField(source="section")
    course_name = serializers.SlugField(source="course")
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'text', 'words', 'pub_date', 'nb_words', 'section', 'course', 'section_name', 'course_name', 'exercices', 'level_code']
   

class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    course_name = serializers.SlugField(source="course")
    class Meta:
        model = Section
        fields = ['id', 'name', 'pub_date', 'course', 'course_name', 'lessons']

class CourseSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'pub_date', 'sections', 'level_code']


class LevelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Level
        fields = ['code', 'name']

  
