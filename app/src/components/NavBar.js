/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router-dom'

const style = {
  navLinkContainer: {
    backgroundColor: "#EE6E73",
    height: 65
  },
  navBar: {
    marginBottom: 30
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query
    };
  }
  componentDidMount(){
    if(this.props.displaySearch){
      $('ul.tabs').tabs();
    }
  }
  renderSearchBar() {
    if(this.props.displaySearch){
      return(
        <form action="/search">
          <div className="input-field">
            <input name="q" defaultValue={this.state.query} id="search" type="search" required />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      );
    }
    return(
      <ul className="right hide-on-med-and-down">
        <li><Link to="/search">Demand-Based Equity Valuation</Link></li>
        <li><Link to="/methodology">Methodology</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/disclaimer">Disclaimer</Link></li>
      </ul>
    );
  }
  renderNavLinkContainer() {
    if(this.props.displaySearch){
      return(
        <div className="nav-content">
          <ul style={style.navLinkContainer} className="">
            <li><Link to="/search">Demand-Based Equity Valuation</Link></li>
            <li><Link to="/methodology">Methodology</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>
      );
    }
    return null;
  }
  render(){
    return(
      <nav style={style.navBar}>
        <div className="nav-wrapper">
          {this.renderSearchBar()}
        </div>
        {this.renderNavLinkContainer()}
      </nav>
    );
  }
}
NavBar.displayName = 'NavBar';

export default NavBar;
