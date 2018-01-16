from http import HTTPStatus as status
from datetime import date
from rest_framework.test import APITestCase
from api.models import Task, TaskList, User, Report

class UserTests(APITestCase):
    def setUp(self):
        self.data = {
            'username': 'locke', 'password': '123',
            'email': 'my@email.com'
        }
        self.url = '/users/'

    def test_create_user_works(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.CREATED)

    def test_create_user_without_username(self):
        self.data.pop('username')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.BAD_REQUEST)

    def test_create_user_without_password(self):
        self.data.pop('password')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.BAD_REQUEST)

    def test_create_user_without_email(self):
        self.data.pop('email')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.BAD_REQUEST)

    def test_create_user_with_invalid_email(self):
        self.data['email'] = 'bla'
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.BAD_REQUEST)


class TaskListTests(APITestCase):
    def setUp(self):
        user_data = {'username':'jack', 'password':'123'}

        self.user = User.objects.create(username='jack', email='wehave@togoback.kate')
        self.user.set_password('123')
        self.user.save()

        response = self.client.post('/login/', user_data)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])

        self.data = {'name': 'List name'}
        self.url = '/lists/'

    def test_create_list_without_permission(self):
        self.client.credentials()
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.UNAUTHORIZED)

    def test_create_list_with_permission(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.CREATED)

    def test_logged_in_user_is_list_creator(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.data['creator'], self.user.id)


class CreateTaskTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='jack', email='wehave@togoback.kate')
        cls.user.set_password('123')
        cls.user.save()

        cls.task_list_id = TaskList.objects.create(name='Leave', creator=cls.user).id
        cls.url = '/tasks/'


    def setUp(self):
        user_data = {'username':'jack', 'password':'123'}
        response = self.client.post('/login/', user_data)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])

        self.data = {
            'name': 'Get off of the island', 'task_list': self.task_list_id,
        }

    def test_create_task_without_permission(self):
        self.client.credentials()
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.UNAUTHORIZED)

    def test_create_task_without_list(self):
        self.data.pop('task_list')
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.BAD_REQUEST)

    def test_create_task_with_permission_and_list(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.CREATED)

    def test_create_task_without_name(self):
        self.data['name'] = ''
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.BAD_REQUEST)

    def test_create_task_with_optional_assignee(self):
        self.data['assignee'] = {'id': self.user.id, 'username': self.user.username}
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.CREATED)

    def test_create_task_with_optional_deadline(self):
        self.data['deadline'] = '2018-06-20'
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.CREATED)

    def test_create_task_with_optional_completed(self):
        self.data['completed'] = True
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.CREATED)


class EditTaskTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username='jack', email='wehave@togoback.kate')
        cls.user.set_password('123')
        cls.user.save()

        cls.task_list_id = TaskList.objects.create(name='Be good', creator=cls.user).id


    def setUp(self):
        user_data = {'username':'jack', 'password':'123'}
        response = self.client.post('/login/', user_data)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])
        self.task = Task.objects.create(name='Get out', task_list_id=self.task_list_id)

        self.new_data = {
            'name': 'Get back to the island',
            'deadline': '2018-06-20',
            'assignee': {
                'id': self.user.id,
                'username': self.user.username
            },
            'completed': True,
        }
        self.url = '/tasks/{0.id}/'.format(self.task)

    def test_edit_task_without_permission(self):
        self.client.credentials()
        response = self.client.patch(self.url, self.new_data, format='json')
        self.assertEqual(response.status_code, status.UNAUTHORIZED)

    def test_edit_task_with_permission(self):
        response = self.client.patch(self.url, self.new_data, format='json')
        self.assertEqual(response.status_code, status.OK)
        self.assertEqual(response.data['name'], self.new_data['name'])
        self.assertEqual(response.data['deadline'], self.new_data['deadline'])

    def test_completed_at_has_value_when_task_is_completed(self):
        self.assertFalse(self.task.completed)
        self.assertIsNone(self.task.completed_at)
        response = self.client.patch(self.url, self.new_data, format='json')
        self.assertEqual(response.status_code, status.OK)
        self.assertIsNotNone(response.data['completed_at'])
        self.assertEqual(response.data['completed_at'], date.today().isoformat())

    def test_delete_task_without_permission(self):
        self.client.credentials()
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.UNAUTHORIZED)

    def test_delete_task_with_permsission(self):
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.NO_CONTENT)
