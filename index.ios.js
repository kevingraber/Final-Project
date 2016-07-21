import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Navigator,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import PageOne from './PageOne.js';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import LoggedIn from './LoggedIn.js'
import SearchResults from './SearchResults.js'
import Result from './Result'
import CreateEvent from './CreateEvent'
import UpdateUser from './UpdateUser'
import UserList from './UserList'
import Profile from './Screens/Profile'
import Search from './Screens/Search'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class SearchIcon extends React.Component {
    render(){
        return (
            <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="search" size={30} color="white" />
        );
    }
}

class TabIcon2 extends React.Component {
    render(){
        return (
            <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="add-circle" size={30} color="white" />
        );
    }
}

class ProfileIcon extends React.Component {
    render(){
        return (
            <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="account-circle" size={30} color="white" />
        );
    }
}

class FinalProject extends Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBar} backButtonTextStyle={styles.backButton}>
        <Scene key="root">
          <Scene key="pageOne" component={PageOne} title="Welcome!" initial={true} />

          <Scene tabBarStyle={{backgroundColor:'black'}} key="tabbed" tabs={true}>
            <Scene icon={SearchIcon} key="search" direction="vertical" component={Search} title="Search" />
            <Scene icon={TabIcon2} key="signup" component={SignUp} title="Sign Up!" />
            <Scene icon={ProfileIcon} key="profile" component={Profile} title="Profile" />
          </Scene>

          <Scene sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}} key="searchresults" component={SearchResults} title="Search Results!" />
          <Scene sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}} key="eventpage" component={Result} title="Event Page!" />
          <Scene key="createevent" component={CreateEvent} title="Create Event!" />
          <Scene key="updateuser" component={UpdateUser} title="Update User" />
          <Scene sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight}} key="userlist" component={UserList} title="User List" />
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    borderBottomWidth: 0
  },
  backButton: {
    color: '#c0cac9'
  }
});


AppRegistry.registerComponent('FinalProject', () => FinalProject);