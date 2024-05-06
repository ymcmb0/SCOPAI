from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.validators import validate_email as django_validate_email
from django.contrib.auth.password_validation import validate_password as django_validate_password
UserModel = get_user_model()

def custom_validation(data):
    """
    Perform custom validation on the data.
    """
    email = data.get('email', '').strip()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    validate_username(data)
    if not email:
        raise ValidationError('Email is required.')
    if not username:
        raise ValidationError('Username is required.')
    if not password:
        raise ValidationError('Password is required.')
    return data
def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('An email is required')
    # if not django_validate_email(email):
    #     raise ValidationError('Enter a valid email address.')
    return email

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('A username is required')
    # Check if username starts with an alphabet
    if not username[0].isalpha():
        raise ValidationError('Username must start with an alphabet')
    # Check if username contains a number either in the middle or at the end
    if not any(char.isdigit() for char in username[1:-1]):
        raise ValidationError('Username must contain a number either in the middle or at the end')

    # Validate username length and characters
    # You can add more validations as needed

    return username

def validate_password(data):
    """
    Validate the strength of the password.
    """
    password = data.get('password', '')

    try:
        django_validate_password(password)
    except ValidationError as e:
        raise ValidationError(str(e))

    return data