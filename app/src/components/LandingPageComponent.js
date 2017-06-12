/**
 * Created by raylenmargono on 6/9/17.
 */
'use strict';

import React from 'react';
import { Link } from 'react-router-dom'

const style = {
  button: {
    width: "100%"
  },
  buttonCollection:{
    marginTop: 8
  }
};

class LandingPageComponent extends React.Component {

  componentDidMount() {
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div className="container">
        <div className="col s12">
          <div className="row">
            <h5 className="center-align">Demand-Based Equity Valuations</h5>
            <h5 className="center-align">Ralph Koijen & Motohiro Yogo</h5>
          </div>
          <div className="row">
            <div className="col s12 m7">
              <div className="card-panel teal z-depth-5">
                <h5 className="white-text">What We Do</h5>
                <p className="white-text">
                  latent demand captures differences in beliefs or constraints.
                  For instance, take two firms with the same fundamentals,
                  but investors are more optimistic about firm A than firm B.
                  Then the value of firm A will be higher than the value of firm B
                  (assuming that they're not perfect substitutes). Now, the beliefs of large investors, who allocate more
                  capital, matters more. That is, if I like Apple, it will have virtually no impact on prices;
                  if BlackRock like Apple, it may affect the price. Hence, the wedge between the actual
                  price and the fundamental value reflects beliefs or constraints of investors,
                  which we can break down to the investor level.
                </p>
              </div>
            </div>
            <div style={style.buttonCollection} className="col s12 m5">
              <div className="row">
                <Link to="/methodology" style={style.button} className="waves-effect waves-light btn-large">
                  Methodology
                </Link>
              </div>
              <div className="row">
                <Link to="/search" style={style.button} className="waves-effect waves-light btn-large">
                  Demand-based Equity Valuations
                </Link>
              </div>
              <div className="row">
                <Link to="/FAQ" style={style.button} className="waves-effect waves-light btn-large">
                  FAQ
                </Link>
              </div>
              <div className="row">
                <Link to="/team" style={style.button} className="waves-effect waves-light btn-large">
                  Team
                </Link>
              </div>
              <div className="row">
                <Link to="/disclaimer" style={style.button} className="waves-effect waves-light btn-large">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPageComponent.displayName = 'LandingPageComponent';

export default LandingPageComponent;
