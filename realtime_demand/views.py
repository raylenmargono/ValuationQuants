# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from realtime_demand.models import Asset
from realtime_demand.serializers import AssetSerializer


class AssetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    lookup_field = "ticker"
