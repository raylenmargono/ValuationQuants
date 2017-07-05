from rest_framework import serializers

from realtime_demand.models import Investor, Asset, AssetInvestors


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = ("name",)


class AssetInvestorSerializer(serializers.ModelSerializer):

    investor = serializers.SerializerMethodField()

    class Meta:
        model = AssetInvestors
        fields = ("latent_demand_value", "investor")

    def get_investor(self, obj):
        return obj.investor.name


class AssetSerializer(serializers.ModelSerializer):

    investors = serializers.SerializerMethodField()

    class Meta:
        model = Asset
        fields = ("current_market_cap", "fundamental_value", "household_value",
                  "total_latent_demand_value", "ticker", "company_name",
                  "investors")

    def get_investors(self, obj):
        asset_investors = obj.asset_investors.all()
        return AssetInvestorSerializer(asset_investors, many=True).data
