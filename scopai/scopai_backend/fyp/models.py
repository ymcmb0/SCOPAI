from django.contrib.auth.models import AbstractUser
from django.db import models

class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    USER_ROLES = (
        ('developer', 'Developer'),
        ('advertiser', 'Advertiser'),
    )

    role = models.CharField(max_length=20, choices=USER_ROLES)
    github_profile = models.URLField(blank=True, null=True)
    programming_languages = models.ManyToManyField(ProgrammingLanguage, blank=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    advertisement_budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Ensure that the user has the correct permissions based on their role
        if self.role == 'developer':
            self.is_staff = False
            self.is_superuser = False
        elif self.role == 'advertiser':
            self.is_staff = False
            self.is_superuser = False

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} - {self.role}"

class AdPoster(models.Model):
    image = models.ImageField(upload_to='ad_posters/')
    link = models.URLField()
