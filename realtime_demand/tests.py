# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from django.contrib.auth.models import User
from django.test import Client
from rest_framework import status
from rest_framework.test import APITestCase


# todo make this test better
from realtime_demand.models import Asset


class AssetAPITestCase(APITestCase):

    def setUp(self):
        admin_password = "se3CurePass1ord!"
        admin_user = User.objects.create_superuser("adminuser", "admin@valuationquants.com", admin_password)
        base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        dir_path = "/realtime_demand/file_upload_validator/test_data/"
        test_data_path = "{}{}{}".format(base_path,  dir_path, "DecomposeValuationsSimpleMod.csv")
        c = Client()
        c.login(username=admin_user.username, password=admin_password)

        with open(test_data_path, 'r') as asset_file:
            res = c.post("/admin/file/upload", {
                "asset_file": asset_file
            })

    def test_asset_api_list(self):
        response = self.client.get('/assets/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_asset_api_ticker(self):
        asset = Asset.objects.all().first()
        response = self.client.get('/assets/{}/'.format(asset.ticker), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
