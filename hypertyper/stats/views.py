from django.shortcuts import render
from django.http import JsonResponse

from typer.models import Exercice
# Create your views here.


def nb_exercices(request):
    user = request.user
    print(user)
    if user is None:
        return JsonResponse({
            "non_field_errors": "Not Authenticated"
        }, status=400)

    return JsonResponse({
        "nb_exercices": len(Exercice.objects.filter(user=user))
    }, status=200)