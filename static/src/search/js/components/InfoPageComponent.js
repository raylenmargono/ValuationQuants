'use strict';

import React from 'react';
import NavBar from './NavBar';
import MainStore from '../stores/MainStore';
import SearchPageComponent from './SearchPageComponent';
import LatentDemandBreakdownChart from './chart/LatentDemandBreakdownChart';
import ValuationCompositionChart from './chart/ValuationCompositionChart';
import BrowserHistory from './BrowserHistory';

class StockFundamentalsCard extends React.Component {
  render(){
    const currentAsset = this.props.currentAsset;
    return(
      <div className="card-panel z-depth-5">
        <h5>Valuation Breakdown</h5>
        <ul className="collection">
          <li className="collection-item">
            <p className="title">Market Cap: <b>{currentAsset.currentMarketCap}</b></p>
          </li>
          <li className="collection-item">
            <p className="title">Fundamental Value: <b>{currentAsset.fundamentalValue}</b></p>
          </li>
          <li className="collection-item">
            <p className="title">Latent Demand Value: <b>{currentAsset.latentDemandValue}</b></p>
          </li>
          <li className="collection-item">
            <p className="title">Household Value: <b>{currentAsset.householdValue}</b></p>
          </li>
        </ul>
      </div>
    );
  }
}

class InvestorCard extends React.Component {
  getInvestorRows(){
    const investors = this.props.currentAsset.investors;
    var result = [];
    investors.forEach((investor)=>{
      result.push(
        <tr key={investor.investorName}>
          <td>{investor.investorName}</td>
          <td>{investor.latentDemand}</td>
        </tr>
      );
    });
    return result;
  }
  render(){
    return(
      <div className="card-panel z-depth-5">
        <h5>Top 5 Largest Investors</h5>
        <table className="centered">
          <thead>
            <tr>
                <th>Firm</th>
                <th>Latent Demand Value</th>
            </tr>
          </thead>
          <tbody>
            {this.getInvestorRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

class InfoContainer extends React.Component {
  render(){
    const currentAsset = this.props.currentAsset;
    const isLoading = this.props.isLoading;
    const hasError = this.props.hasError;
    var view = null;
    if(isLoading){
      view = <h3>Loading</h3>
    }
    else if(hasError){
      view = <h3>Ticker not found</h3>
    }
    else {
      view = (
        <div>
          <h5>{currentAsset.companyName} - {currentAsset.ticker} </h5>
          <div className="row">
            <div className="col s12 m6">
              <InvestorCard currentAsset={currentAsset}/>
            </div>
            <div className="col s12 m6">
              <LatentDemandBreakdownChart currentAsset={currentAsset}/>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <StockFundamentalsCard currentAsset={currentAsset}/>
            </div>
            <div className="col s12 m6">
              <ValuationCompositionChart currentAsset={currentAsset}/>
            </div>
          </div>
        </div>
      );
    }
    return(
      isLoading ? null :
      <div className="container info-container">
        {view}
      </div>
    );
  }
}

class InfoPageComponent extends React.Component {
  constructor(props, context){
    super(props);
    this.state = MainStore.getState();
  }
  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
    const query = this.getQuery();
    if(query){
      MainStore.performSearch(query);
    }
  }
  componentWillUnmount() {
    MainStore.unlisten(this.onChange.bind(this));
  }
  onChange(state) {
    this.setState(state);
  }
  getQuery(){
    const search = window.location.search;
    const params = new URLSearchParams(search);
    return params.get('q');
  }
  performSearch(e, searchInput){
    e.preventDefault();
    BrowserHistory.push({
      search: `?q=${searchInput}`
    });
    MainStore.performSearch(searchInput);
  }
  render() {
    return (
      <div className="infopage-component">
        <NavBar performSearch={this.performSearch} query={this.getQuery()}/>
        {
          this.getQuery() ?
          <InfoContainer {...this.state}/> :
          <SearchPageComponent performSearch={this.performSearch}/>
        }
      </div>
    );
  }
}

InfoPageComponent.displayName = 'InfoPageComponent';

// Uncomment properties you need
// InfoPageComponent.propTypes = {};
// InfoPageComponent.defaultProps = {};

export default InfoPageComponent;
