/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';

const style = {
  navBar: {
    marginBottom: 30,
    backgroundColor: "black"
  },
  inputField: {
    width: "700px"
  }
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: props.query
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      searchInput: nextProps.query
    });
  }
  componentDidMount(){
    $(".button-collapse").sideNav();
  }
  renderSearchBar() {
    return(
      <form onSubmit={(e)=> this.props.performSearch(e, this.state.searchInput)}>
        <div style={style.inputField} className="input-field">
          <input
            name="q"
            value={this.state.searchInput}
            id="search"
            type="search"
            required
            onChange={(e)=>this.setState({searchInput: e.target.value})}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </form>
    );
  }
  render(){
    const navOptions = (
        <div>
          <li><a href={GLOBAL.API.home + "#wwd"}>What We Do</a></li>
          <li><a href={GLOBAL.API.home + "#methodology"}>Methodology</a></li>
          <li><a href={GLOBAL.API.home + "#team"}>Team</a></li>
          <li><a href={GLOBAL.API.home + "#disclaimer"}>Disclaimer</a></li>
          <li><a href={GLOBAL.API.home + "#faq"}>FAQ</a></li>
        </div>
    );
    return(
      <nav style={style.navBar}>
        <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {navOptions}
          </ul>
          <ul className="side-nav" id="mobile">
            {navOptions}
          </ul>
          {this.renderSearchBar()}
        </div>
      </nav>
    );
  }
}
NavBar.displayName = 'NavBar';

export default NavBar;
