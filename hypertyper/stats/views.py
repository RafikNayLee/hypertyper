import imp
from django.http import JsonResponse
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from typer.models import Exercice,Lesson
import math

class UserProgressView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        lessons = Lesson.objects.all()
        course = request.GET.get("course")
        if course is not None:
            lessons = Lesson.objects.filter(course=course)
        completed_lessons = 0
        for lesson in lessons:
            
            exercice = Exercice.objects.filter(lesson=lesson, user=request.user)
            
            if len(exercice) > 0 and exercice[0].completed is True:
                completed_lessons = completed_lessons + 1
        progression = round(completed_lessons / len(lessons) * 100, 2) 

        return JsonResponse({
            "progression": progression
        }, status=200)


class HighScoreWPMView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        lesson = request.GET.get("lesson", None)   
        exercices = []
        if lesson is None:
            exercices = Exercice.objects.filter(user=request.user)
        else:
            exercices = Exercice.objects.filter(user=request.user, lesson=lesson)
        seq = list(map(lambda x: x.wpm, exercices))
        high_score = 0
        if not seq:
            high_score = 0 
        else:
            high_score = max(seq)

        return JsonResponse({
            "high_score": high_score
        }, status=200)

class NBExercicesView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        lesson = request.GET.get("lesson", None)   
        exercices = []
        if lesson is None:
            exercices = Exercice.objects.filter(user=request.user)
        else:
            exercices = Exercice.objects.filter(user=request.user, lesson=lesson)
        return JsonResponse({
            "nb_exercices": len(exercices)
        }, status=200)
