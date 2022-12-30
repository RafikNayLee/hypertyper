from django.urls import path, include
from .views import NBExercicesView, HighScoreWPMView, UserProgressView

urlpatterns = [
    path('nb_exercices', NBExercicesView.as_view(), name="nb_exercices"),
    path('high_score_wpm', HighScoreWPMView.as_view(), name="high_score_wpm"),
    path('user_progress', UserProgressView.as_view(), name="user_progress"),
]