import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './PageOne.js';
// import PageTwo from './PageTwo.js';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import LoggedIn from './LoggedIn.js'
import SearchResults from './SearchResults.js'
import Result from './Result'

class FinalProject extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="pageOne" component={PageOne} title="Welcome!" initial={true} />
          {/*<Scene key="pageTwo" component={PageTwo} title="PageTwo" />*/}
          <Scene key="login" direction="vertical" component={LogIn} title="Log In!" />
          <Scene key="signup" component={SignUp} title="Sign Up!" />
          <Scene key="welcome" component={LoggedIn} title="Welcome!" />
          <Scene key="searchresults" component={SearchResults} title="Search Results!" />
          <Scene key="eventpage" component={Result} title="Event Page!" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('FinalProject', () => FinalProject);