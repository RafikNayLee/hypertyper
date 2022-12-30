from rest_framework import serializers

from .models import Lesson, Course, Section, Exercice, Level

class ExerciceSerializer(serializers.ModelSerializer):
    lesson_name =serializers.CharField(source='lesson.name', required=False)
    lesson_id =serializers.CharField(source='lesson.id', required=False)
    course_name =serializers.CharField(source='lesson.course.name', required=False)
    course_id =serializers.CharField(source='lesson.course.id', required=False)
    locale =serializers.CharField(source='lesson.course.locale', required=False)
    user_name = serializers.SlugField(source="user", required=False)
    
    class Meta:
        model = Exercice
        fields = ['id', 'text', 'pub_date', 'words', 'nb_words', 'lesson', 'lesson_name', 'lesson_id', 'course_name', 'course_id', 'user', 'user_name', 'seconds', 'minutes', 'wpm', 'mistakes', 'level_code', 'accuracy', 'locale', 'completed']

class LessonSerializer(serializers.ModelSerializer):
    section_name =serializers.CharField(source='section.name')
    course_name =serializers.CharField(source='course.name')
    
    completed_exercices = serializers.SerializerMethodField('_completed')

    def _completed(self, obj):
        request = self.context.get('request', None)
        
        if request and request.user:
            completed_exercices = list(filter(lambda e: e.completed == True, Exercice.objects.filter(user=request.user,lesson=obj.id)))
            return len(completed_exercices)
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'text', 'words', 'pub_date', 'nb_words', 'section', 'course', 'section_name', 'course_name', 'exercices', 'level_code', 'min_wpm', 'min_accuracy', 'locale', 'order_n', 'next_lesson', 'completed_exercices']
   

class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    course_name =serializers.CharField(source='course.name')
    class Meta:
        model = Section
        fields = ['id', 'name', 'pub_date', 'course', 'course_name', 'lessons', 'locale']

class CourseSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'pub_date', 'sections', 'level_code', 'locale']


class LevelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Level
        fields = ['code', 'name']

  
