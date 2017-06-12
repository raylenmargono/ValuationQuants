/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';
import NavBar from './NavBar';

class FAQPageComponent extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <div className="col s12">
            <div className="row inner">
              <h5 className="center-align">Team</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FAQPageComponent.displayName = 'FAQPageComponent';

export default FAQPageComponent;
