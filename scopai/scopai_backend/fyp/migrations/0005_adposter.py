# Generated by Django 4.2.3 on 2024-03-11 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fyp', '0004_customuser_programminglanguage_delete_appuser_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdPoster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='ad_posters/')),
            ],
        ),
    ]
