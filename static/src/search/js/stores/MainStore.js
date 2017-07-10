import alt from '../components/Dispatcher';
import ApiSource from '../sources/ApiSource';
import MainActions from '../actions/MainActions';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Investor {
  constructor(data){
    this.investorName = numberWithCommas(data["investor"]);
    this.latentDemand = numberWithCommas(data["latent_demand_value"]);
  }
}

class AssetData {
  constructor(data){
    this.investors = [];
    data["investors"].forEach((data)=>{this.investors.push(new Investor(data))});
    this.currentMarketCap = numberWithCommas(data["current_market_cap"]);
    this.ticker = numberWithCommas(data["ticker"]);
    this.companyName = numberWithCommas(data["company_name"]);
    this.fundamentalValue = numberWithCommas(data["fundamental_value"]);
    this.latentDemandValue = numberWithCommas(data["total_latent_demand_value"]);
    this.householdValue = numberWithCommas(data["household_value"]);
  }
}

export class MainStore {

  constructor() {
    this.registerAsync(ApiSource);
    this.isLoading = true;
    this.hasError = false;
    this.currentAsset = null;
    this.bindListeners({
      loadingResults: MainActions.loadingResults,
      receivedResults: MainActions.receivedResults,
      fetchingResultsFailed: MainActions.fetchingResultsFailed
    });
  }
  loadingResults(){
    this.isLoading = true;
  }
  receivedResults(payload){
    this.currentAsset = new AssetData(payload["data"]);
    this.isLoading = false;
    this.hasError = false;
  }
  fetchingResultsFailed(payload){
    this.hasError = true;
    this.isLoading = false;
  }
  search(query) {
    if (!this.getInstance().isLoading()) {
      this.getInstance().performSearch(query);
    }
  }
}

export default alt.createStore(MainStore, 'MainStore');
