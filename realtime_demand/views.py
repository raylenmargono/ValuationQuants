# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.views import APIView


class StockDataView(APIView):
    def get(self, request, query):
        return Response({})

