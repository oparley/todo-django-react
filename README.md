# Todo list with react and django

## Instalation

It's recommended to use vagrant for virtualization of your environment. Everything in this list will work without VMs, but it might need super user privileges.

1. Clone the repository and start the vm with `vagrant up`
2. Access it using `vagrant ssh`
3. Create a python venv running `python3 -m venv <your_venv_name>`
4. Activate the python environment with `. ~/venv/<your_venv_name>/bin/activate`
5. Go to `/vagrant`. That is the shared folder with the host env.
6. Run `npm install` to install js dependencies
7. Run `pip install -r requirements.txt` to install python dependencies
8. Run `./manage.py runserver 0.0.0.0:8000` to run the Django server
9. On another terminal window run `npm run start` to start the React server.
10. Enjoy the application at `localhost:3000`


### Generate reports

This application can generate automated reports, that show the completed tasks that day, for each user.

To run it as a crontab, run `crontab -e` and add the folloging line to it. This cron will run the command and store the logs in `log`:

```
0 23 * * * (. /home/vagrant/venv/bin/activate && python /vagrant/manage.py makereports) >> /vagrant/log 2>&1
```

If you're not running the app on vagrant or with a virtual env change it to:
```
0 23 * * * * python3 path/to/manage.py makereports
```
