'use strict';

import React from 'react';

const style =  {
    "position": "relative",
    "top": "140px",
};

class SearchPageComponent extends React.Component {
  render() {
    return (
      <div style={style} className="container">
        <div className="col s12">
          <form action="/search">
            <div className="row">
              <div className="input-field col s6 offset-s2">
                <input name="q" type="text" className="validate" />
                <label htmlFor="searchBar">Enter Ticker</label>
                <button className="btn waves-effect waves-light" type="submit">Search
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SearchPageComponent.displayName = 'SearchPageComponent';

export default SearchPageComponent;
