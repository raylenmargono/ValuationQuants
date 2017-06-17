from rest_framework import serializers

from realtime_demand.models import Investor, Asset, AssetInvestors


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = ("name", "aum")


class AssetInvestorSerializer(serializers.ModelSerializer):

    investor = serializers.SerializerMethodField()

    class Meta:
        model = AssetInvestors
        fields = ("stocks_owned", "latent_demand_value", "investor")

    def get_investor(self, obj):
        return InvestorSerializer(obj.investor).data


class AssetSerializer(serializers.ModelSerializer):

    investors = serializers.SerializerMethodField()

    class Meta:
        model = Asset
        fields = ("quarter_end_price", "fundamental_value",
                  "total_latent_demand_value", "ticker", "company_name",
                  "investors")

    def get_investors(self, obj):
        asset_investors = obj.asset_investors.all()
        return AssetInvestorSerializer(asset_investors, many=True).data
