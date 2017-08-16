#!/bin/bash

cp ./nginx/default /etc/nginx/sites-enabled
git pull
python manage.py migrate
service nginx restart
service gunicorn restart
