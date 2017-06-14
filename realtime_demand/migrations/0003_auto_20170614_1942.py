# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-14 19:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('realtime_demand', '0002_auto_20170614_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asset',
            name='company_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='asset',
            name='fundamental_value',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='asset',
            name='latent_demand_value',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='asset',
            name='quarter_end_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='assetinvestors',
            name='latent_demand_value',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='assetinvestors',
            name='stocks_owned',
            field=models.FloatField(default=0),
        ),
    ]
