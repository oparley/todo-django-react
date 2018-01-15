# Generated by Django 2.0.1 on 2018-01-15 22:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0005_auto_20180113_2329'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='creator',
        ),
        migrations.AddField(
            model_name='tasklist',
            name='creator',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='lists', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
