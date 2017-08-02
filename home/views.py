# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from models import TeamMembers, FAQ, MethodologyEquation, Disclaimer, AboutSection


def home_view(request):
    context = {
        "team_members": TeamMembers.objects.all(),
        "faqs": FAQ.objects.all(),
        "methodology": MethodologyEquation.objects.first(),
        "disclaimer": Disclaimer.objects.first(),
        "about_section": AboutSection.objects.first()
    }
    return render(request, 'home.html', context)
