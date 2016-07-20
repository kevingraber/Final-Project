import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Navigator
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './PageOne.js';
// import PageTwo from './PageTwo.js';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import LoggedIn from './LoggedIn.js'
import SearchResults from './SearchResults.js'
import Result from './Result'
import CreateEvent from './CreateEvent'
import UpdateUser from './UpdateUser'

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
          <Scene sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}} key="searchresults" component={SearchResults} title="Search Results!" />
          <Scene sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}} key="eventpage" component={Result} title="Event Page!" />
          <Scene key="createevent" component={CreateEvent} title="Create Event!" />
          <Scene key="updateuser" component={UpdateUser} title="Update User" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('FinalProject', () => FinalProject);