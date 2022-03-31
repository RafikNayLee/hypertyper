
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("app/", include("frontend.urls")),
    path("api/", include("typer.urls")),
    path("stats/", include("stats.urls")),
]
