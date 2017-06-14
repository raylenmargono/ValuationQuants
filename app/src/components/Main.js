import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types'
import {Router} from 'react-router'
import InfoPageComponent from './InfoPageComponent';
import LandingPageComponent from './LandingPageComponent';
import MethodologyPageComponent from './MethodologyPageComponent';
import FAQPageComponent from './FAQPageComponent';
import TeamPageComponent from './TeamPageComponent';
import DisclaimerPageComponent from './DisclaimerPageComponent';
import BrowserHistory from './BrowserHistory';

class BrowserRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node
  };

  history = BrowserHistory;

  render() {
    return <Router history={this.history} children={this.props.children}/>
  }
}


class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LandingPageComponent} />
          <Route path="/search" component={InfoPageComponent}/>
          <Route path="/methodology" component={MethodologyPageComponent}/>
          <Route path="/faq" component={FAQPageComponent}/>
          <Route path="/team" component={TeamPageComponent}/>
          <Route path="/disclaimer" component={DisclaimerPageComponent}/>
        </div>
      </BrowserRouter>
    )
  }
}


export default App;
