from api.models import *
from faker import Faker
from random import randint, choice

fake = Faker()

u = User.objects.get_or_create(username='parley', is_staff=True)[0]
u.set_password('123')
u.save()

users = [u]

for i in range(0, 10):
    bla = fake.profile(['mail', 'username'])
    u2 = User.objects.get_or_create(username=bla['username'], email=bla['mail'])[0]
    u2.set_password('123')
    u2.save()
    users.append(u2)


range_lists = randint(3, 5)
for i in range(0, range_lists):
    tl = TaskList.objects.create(name=fake.sentence(nb_words=2))
    size = randint(3, 7)
    for j in range(0, size):
        completed = bool(randint(0, 1))
        t = Task.objects.create(
            name=fake.sentence(nb_words=3),
            task_list_id=tl.id, completed=completed,
            creator=choice(users), assignee=choice(users)
        )
