# Generated by Django 4.0.3 on 2022-04-01 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('typer', '0010_level_course_level_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='min_accuracy',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='lesson',
            name='min_wpm',
            field=models.IntegerField(default=0),
        ),
    ]
