import axios from 'axios';
import MainActions from 'actions/MainActions';

const ApiSource = {
  performSearch: {
    remote(state, query) {
      var hostname = window.location.hostname;
      if(hostname === "localhost" || hostname === "127.0.0.1"){
        hostname = `${window.location.protocol}//127.0.0.1:8080`;
      }
      return axios.get(`${hostname}/assets/${query}/`);
    },
    loading: MainActions.loadingResults,
    success: MainActions.receivedResults,
    error: MainActions.fetchingResultsFailed,
  }
};

export default ApiSource;
