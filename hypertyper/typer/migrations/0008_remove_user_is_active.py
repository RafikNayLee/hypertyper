# Generated by Django 4.0.3 on 2022-03-05 23:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('typer', '0007_remove_user_active_remove_user_language'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_active',
        ),
    ]
