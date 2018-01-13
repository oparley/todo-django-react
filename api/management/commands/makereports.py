from datetime import date, timedelta
from django.core.management.base import BaseCommand, CommandError
from api.models import User, Report
from django.core.mail import send_mail


class Command(BaseCommand):
    help = 'Generates the daily reports'

    def handle(self, *args, **options):
        for user in User.objects.all():
            report = self.create_user_report(user)
            send_mail(
                'Daily Report - {}'.format(date.today().strftime("%b %d, %Y")),
                report.text,
                'list@todo.com',
                [report.user.email]
            )

    def create_user_report(self, user):
        done = user.tasks.filter(completed_at=date.today())
        in_one_week = date.today() + timedelta(weeks=1)
        near = user.tasks.filter(completed_at__gt=date.today(), completed_at__lte=in_one_week)

        text = 'Hello {0.username},\nHere is your daily report.'.format(user)
        text += '\n\nYou completed {count} task(s) today:'.format(count=done.count())

        for task in done:
            text += '\n\t - {0.name}, assignee: {0.assignee}, list: {0.task_list.name}'.format(task)

        text += '\n\nHere are the tasks with deadlines within the next week:'
        for task in near:
            text += '\n\t - {0.name}, deadline: {0.deadline}'.format(task)

        return Report.objects.create(text=text, user=user)
