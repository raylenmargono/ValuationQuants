# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import csv
from rest_framework.response import Response
from rest_framework.views import APIView


# def importcsv(request):
#      if request.method == "POST":
#         form = DataInput(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect('Url/')
#      else:
#         form = DataInput()
#         context = {"form": form}
#         return render_to_response("imported.html", context,context_instance=RequestContext(request))

