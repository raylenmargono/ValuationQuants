# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class TeamMembers(models.Model):
    profile_picture = models.ImageField(upload_to='team_photos')
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return self.name


class MethodologyEquation(models.Model):
    text = models.TextField()

    class Meta:
        verbose_name = "Methodology Equation"
        verbose_name_plural = "Methodology Equations"


class Disclaimer(models.Model):
    text = models.TextField()

    class Meta:
        verbose_name = "Disclaimer"
        verbose_name_plural = "Disclaimers"


class FAQ(models.Model):
    question = models.CharField(max_length=250)
    answer = models.TextField()

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class AboutSection(models.Model):
    text = models.TextField()

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Sections"
