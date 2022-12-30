from .models import Lesson, Course, Section, Exercice, Level
from rest_framework import viewsets, permissions
from .serializers import LessonSerializer, CourseSerializer, SectionSerializer, ExerciceSerializer, LevelSerializer


#Exercice ViewSet
class ExerciceViewSet(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.IsAuthenticated
    ]
    filterset_fields = ['id', 'lesson']
    def get_queryset(self):
        queryset = self.request.user.exercices.order_by("-pub_date")
        
        return queryset
     

        

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    serializer_class = ExerciceSerializer

#Lesson ViewSet
class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()

    filterset_fields = ['id', 'name', 'course', 'section']
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LessonSerializer
    

#Section ViewSet
class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SectionSerializer

#Course ViewSet
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    filterset_fields = ['locale']
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CourseSerializer


#Level ViewSet
class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LevelSerializer
