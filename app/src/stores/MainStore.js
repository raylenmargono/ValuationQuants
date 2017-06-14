import alt from 'components/Dispatcher';
import ApiSource from 'sources/ApiSource';
import MainActions from 'actions/MainActions';

class Investor {
  constructor(data){
    this.investorName = data["investor_name"];
    this.latentDemand = data["latent_demand"];
    this.aum = 0;
    this.stocksHeld = 0;
  }
}

class AssetData {
  constructor(data){
    this.investors = [];
    data["investors"].forEach((data)=>{this.investors.push(new Investor(data))});
    this.price = data["price"];
    this.ticker = data["ticker"];
    this.companyName = data["company_name"];
    this.fundamentalValue = data["fundamental_value"]
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
    this.currentAsset = new AssetData(payload);
    this.isLoading = false;
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
