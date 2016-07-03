import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './PageOne.js';
import PageTwo from './PageTwo.js';
import Welcome from './LoggedIn.js';

export default class Index extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="pageOne" component={PageOne} title="PageOne" initial={true} />
          <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
          <Scene key="welcome" component={Welcome} title="Logged In!" />
        </Scene>
      </Router>
    )
  }
}