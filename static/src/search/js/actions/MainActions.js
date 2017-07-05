import alt from '../components/Dispatcher';

class MainActions {
  loadingResults(){
    return true;
  }
  receivedResults(payload){
    return payload;
  }
  fetchingResultsFailed(payload){
    return payload;
  }
}

export default alt.createActions(MainActions);
