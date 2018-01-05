from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Task(models.Model):
    name = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
    completed_at = models.DateField(default=None, null=True, blank=True)
    deadline = models.DateField(default=None, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    task_list = models.ForeignKey('TaskList', on_delete=models.CASCADE, related_name='tasks')


class TaskList(models.Model):
    name = models.CharField(max_length=50)
