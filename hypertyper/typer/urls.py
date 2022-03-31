
from django.urls import path, include
from rest_framework import routers
from .api import LessonViewSet, CourseViewSet, SectionViewSet, ExerciceViewSet, LevelViewSet
from .auth.api import RegisterApi, LoginApi, UserApi
from knox import views as knox_views


router = routers.DefaultRouter()
router.register("exercices", ExerciceViewSet, "exercices")
router.register("lessons", LessonViewSet, "lessons")
router.register("courses", CourseViewSet, "courses")
router.register("levels", LevelViewSet, "levels")
router.register("sections", SectionViewSet, "sections")

urlpatterns = router.urls + [
    path('auth/', include('knox.urls')),
    path('auth/register', RegisterApi.as_view()),
    path('auth/login', LoginApi.as_view()),
    path('auth/user', UserApi.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name="knox_logout")
]