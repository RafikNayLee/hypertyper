from django.contrib import admin

from .models import User, Lesson, Course, Exercice, Section, Level

admin.site.register(User)
admin.site.register(Lesson)
admin.site.register(Course)
admin.site.register(Exercice)
admin.site.register(Section)
admin.site.register(Level)
