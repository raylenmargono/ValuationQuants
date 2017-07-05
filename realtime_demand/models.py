# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models import Sum


class Asset(models.Model):
    current_market_cap = models.DecimalField(default=0, max_digits=25, decimal_places=2)
    fundamental_value = models.DecimalField(default=0, max_digits=25, decimal_places=2)
    ticker = models.CharField(max_length=10, unique=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    household_value = models.DecimalField(default=0, max_digits=25, decimal_places=2)
    total_latent_demand_value = models.DecimalField(default=0, max_digits=25, decimal_places=2)

    class Meta:
        verbose_name = "Asset"
        verbose_name_plural = "Assets"

    @staticmethod
    def get_or_create_using_asset_list(asset_list):
        ticker = asset_list[0]
        company_name = asset_list[1]
        current_market_cap = asset_list[2]
        fundamental_value = asset_list[3]
        total_latent_demand_value = asset_list[4]
        household_value = asset_list[5]
        asset, created = Asset.objects.get_or_create(ticker=ticker)
        asset.company_name = company_name
        asset.current_market_cap = current_market_cap
        asset.fundamental_value = fundamental_value
        asset.total_latent_demand_value = total_latent_demand_value
        asset.household_value = household_value
        asset.save()
        return asset


class Investor(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Investor"
        verbose_name_plural = "Investors"


class AssetInvestors(models.Model):
    asset = models.ForeignKey("Asset", related_name="asset_investors")
    investor = models.ForeignKey("Investor", related_name="asset_investors")
    latent_demand_value = models.DecimalField(default=0, max_digits=25, decimal_places=2)

    class Meta:
        verbose_name = "AssetInvestors"
        verbose_name_plural = "AssetInvestors"

    @staticmethod
    def create_asset_investors_using_df(df, asset):
        investors = []
        for index, row in df.iterrows():
            investor_name = row["mgrname"]
            investor_latent_demand_value = row["viInv"]
            investor, created = Investor.objects.get_or_create(name=investor_name)
            asset_investor, created = AssetInvestors.objects.get_or_create(asset=asset, investor=investor)
            asset_investor.latent_demand_value = investor_latent_demand_value
            asset_investor.save()
            investors.append(investor_name)
        AssetInvestors.objects.filter(asset=asset).exclude(investor__name__in=investors).delete()
