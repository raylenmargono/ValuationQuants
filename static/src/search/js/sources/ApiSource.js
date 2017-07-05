import axios from 'axios';
import MainActions from '../actions/MainActions';

const ApiSource = {
  performSearch: {
    remote(state, query) {
      return axios.get(`${GLOBAL.API.search}`.replace("tmp", query));
    },
    loading: MainActions.loadingResults,
    success: MainActions.receivedResults,
    error: MainActions.fetchingResultsFailed,
  }
};

export default ApiSource;
