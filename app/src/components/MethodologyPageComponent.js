/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';
import NavBar from './NavBar';

class MethodologyPageComponent extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="col s12">
            <div className="row inner">
              <h5 className="center-align">Methodology</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MethodologyPageComponent.displayName = 'MethodologyPageComponent';

export default MethodologyPageComponent;
