import React from 'react';
import InfoPageComponent from './InfoPageComponent';
import LandingPageComponent from './LandingPageComponent';
import MethodologyPageComponent from './MethodologyPageComponent';
import FAQPageComponent from './FAQPageComponent';
import TeamPageComponent from './TeamPageComponent';
import DisclaimerPageComponent from './DisclaimerPageComponent';
import {BrowserRouter, Route} from 'react-router-dom';

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
