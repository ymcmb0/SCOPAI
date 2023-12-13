from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, ProgrammingLanguage

class CustomUserAdmin(UserAdmin):
    # Customize the appearance and behavior for the CustomUser model
    list_display = ('username', 'email', 'role', 'date_joined', 'last_login')
    search_fields = ('username', 'email', 'role')
    filter_horizontal = ('programming_languages',)  # If using ManyToManyField

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Developer Details', {'fields': ('github_profile', 'programming_languages')}),
        ('Advertiser Details', {'fields': ('company_name', 'advertisement_budget')}),
    )

# Register the models with the custom admin classes
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ProgrammingLanguage)
