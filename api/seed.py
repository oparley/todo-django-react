from api.models import *
from faker import Faker
from random import randint
fake = Faker()

u = User.objects.get_or_create(username='parley', is_staff=True)[0]
u.set_password('123')
u.save()

range_lists = randint(3, 5)
for i in range(0, range_lists):
    tl = TaskList.objects.create(name=fake.name())
    size = randint(3, 7)
    for j in range(0, size):
        completed = bool(randint(0, 1))
        t = Task.objects.create(name=fake.name(), task_list_id=tl.id, completed=completed, user_id=u.id)
