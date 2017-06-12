'use strict';

import React from 'react';
import NavBar from './NavBar';
import MainStore from 'stores/MainStore';
import SearchPageComponent from './SearchPageComponent';
import LatentDemandBreakdownChart from './chart/LatentDemandBreakdownChart';
import ValuationCompositionChart from './chart/ValuationCompositionChart';

class MarketCapitalizationCard extends React.Component {
  render(){
    return (
      <div className="card-panel z-depth-5">
        <h5>Total Market Capitalization</h5>
        <h3>$3B</h3>
      </div>
    );
  }
}

class StockFundamentalsCard extends React.Component {
  render(){
    const currentAsset = this.props.currentAsset;
    return(
      <div className="card-panel z-depth-5">
        <h5>Current Fundamentals</h5>
        <ul className="collection">
          <li className="collection-item">
            <p className="title">Price: <b>{currentAsset.price}</b></p>
          </li>
          <li className="collection-item">
            <p className="title">Fundamental Value: <b>{currentAsset.fundamentalValue}</b></p>
          </li>
        </ul>
      </div>
    );
  }
}

class LatentDemandCard extends React.Component {
  render(){
    return(
      <div className="card-panel z-depth-5">
        <h5>Total Latent Demand</h5>
        <h3>40</h3>
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
        <li key={investor.investorName} className="collection-item">
          <p className="title">{investor.investorName}: <b> {investor.latentDemand}</b></p>
        </li>
      );
    });
    return result;
  }
  render(){
    return(
      <div className="card-panel z-depth-5">
        <h5>Top 5 Largest Investors</h5>
        <ul className="collection">
          {this.getInvestorRows()}
        </ul>
      </div>
    );
  }
}

class InfoContainer extends React.Component {
  render(){
    const currentAsset = this.props.currentAsset;
    const isLoading = this.props.isLoading;
    return(
      isLoading ? null :
      <div className="container info-container">
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
}

class InfoPageComponent extends React.Component {
  constructor(props, context){
    super(props);
    this.state = MainStore.getState();
  }
  componentDidMount() {
    MainStore.listen(this.onChange.bind(this));
    MainStore.performSearch(this.getQuery());
  }
  componentWillUnmount() {
    MainStore.unlisten(this.onChange.bind(this));
  }
  onChange(state) {
    this.setState(state);
  }
  getQuery(){
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    return params.get('q');
  }
  render() {
    return (
      <div className="infopage-component">
        <NavBar displaySearch={true} query={this.getQuery()}/>
        {this.getQuery() ? <InfoContainer {...this.state}/> : <SearchPageComponent/>}
      </div>
    );
  }
}

InfoPageComponent.displayName = 'InfoPageComponent';

// Uncomment properties you need
// InfoPageComponent.propTypes = {};
// InfoPageComponent.defaultProps = {};

export default InfoPageComponent;
