/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';

const style = {
  navBar: {
    marginBottom: 30,
    backgroundColor: "black"
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
  renderSearchBar() {
    return(
      <form onSubmit={(e)=> this.props.performSearch(e, this.state.searchInput)}>
        <div className="input-field">
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
    return(
      <nav style={style.navBar}>
        <div className="nav-wrapper">
          {this.renderSearchBar()}
        </div>
      </nav>
    );
  }
}
NavBar.displayName = 'NavBar';

export default NavBar;
