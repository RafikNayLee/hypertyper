# Generated by Django 4.0.3 on 2022-04-01 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('typer', '0011_lesson_min_accuracy_lesson_min_wpm'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='next_lesson',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='leads', to='typer.lesson'),
        ),
    ]
