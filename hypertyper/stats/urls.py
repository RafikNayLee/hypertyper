from django.urls import path, include
from .views import nb_exercices 

urlpatterns = [
    path('nb_exercices', nb_exercices, name="nb_exercices"),
]