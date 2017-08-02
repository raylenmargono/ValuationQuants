# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import TeamMembers, MethodologyEquation, Disclaimer, FAQ, AboutSection

# Register your models here.
admin.site.register(TeamMembers)
admin.site.register(MethodologyEquation)
admin.site.register(Disclaimer)
admin.site.register(FAQ)
admin.site.register(AboutSection)
