# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models import Sum


class Asset(models.Model):
    quarter_end_price = models.FloatField(default=0)
    fundamental_value = models.FloatField(default=0)
    ticker = models.CharField(max_length=10, unique=True)
    company_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Asset"
        verbose_name_plural = "Assets"

    @property
    def total_latent_demand_value(self):
        return self.asset_investors.all().aggregate(Sum('latent_demand_value')).get("latent_demand_value__sum")


class Investor(models.Model):
    name = models.CharField(max_length=100)
    aum = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Investor"
        verbose_name_plural = "Investors"


class AssetInvestors(models.Model):
    asset = models.ForeignKey("Asset", related_name="asset_investors")
    investor = models.ForeignKey("Investor", related_name="asset_investors")
    stocks_owned = models.IntegerField(default=0)
    latent_demand_value = models.FloatField(default=0)

    class Meta:
        verbose_name = "AssetInvestors"
        verbose_name_plural = "AssetInvestors"
