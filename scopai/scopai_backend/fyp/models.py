from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, is_developer=False, is_advertiser=False, **extra_fields):
        """
        Creates and saves a User with the given email, username, and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, is_developer=is_developer, is_advertiser=is_advertiser,)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, username, password=None, is_developer=False, is_advertiser=False):
        user = self.create_user(
            email=email,
            username=username,
            password=password,
            is_developer=is_developer,
            is_advertiser=is_advertiser,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    subscription = models.BooleanField(default=False)
    is_developer = models.BooleanField(default=False)
    is_advertiser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.email

class AdPoster(models.Model):
    image = models.ImageField(upload_to='images/')
    link = models.URLField()
    description = models.TextField()  
