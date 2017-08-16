#!/bin/bash

source env/bin/activate
cp ./nginx/default /etc/nginx/sites-enabled
git pull
python manage.py migrate
python manage.py collectstatic --noinput
service nginx restart
service gunicorn restart
