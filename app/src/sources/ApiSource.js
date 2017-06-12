import axios from 'axios';
import MainActinons from 'actions/MainActions';

const fakeData = [{"investors": [{"investor_name": "Fidelity", "latent_demand": "8"}, {"investor_name": "Vanguard", "latent_demand": "-7"}, {"investor_name": "AQR", "latent_demand": "7"}, {"investor_name": "State Street", "latent_demand": "5"}], "price": "156", "ticker": "AAPL", "company_name": "Apple Inc.", "fundamental_value": "140"}, {"investors": [{"investor_name": "AQR", "latent_demand": "-9"}, {"investor_name": "Blackrock", "latent_demand": "-8"}, {"investor_name": "Fidelity", "latent_demand": "6"}, {"investor_name": "UBS", "latent_demand": "-5"}], "price": "72", "ticker": "MSFT", "company_name": "Microsoft", "fundamental_value": "90"}]

const ApiSource = {
  performSearch: {
    remote(state, query) {
        return new Promise(function (resolve, reject) {
        // simulate an asynchronous action where data is fetched on
        // a remote server somewhere.
        setTimeout(function () {
          // resolve with some mock data
          fakeData.forEach((row)=> {
            if(row["ticker"].replace(/ /g,'') == query.replace(/ /g,'')){
              resolve(row);
            }
          });
        }, 250);
      });
    },
    local(state) {
      return null;
    },
    shouldFetch(state) {
      return true;
    },
    loading: MainActinons.loadingResults,
    success: MainActinons.receivedResults,
    error: MainActinons.fetchingResultsFailed,
  }
};

export default ApiSource;
