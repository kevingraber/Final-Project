import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class LoggedIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('STORAGE_KEY').then((token) => {
      this.setState({
        user: token
      });
    });
  }

  // async _fetchInfo() {
  //     var Token = await AsyncStorage.getItem(STORAGE_KEY);
  //     // console.log(Token)
  // }

  async showstorage() {
    var Token = await AsyncStorage.getItem(STORAGE_KEY);
  }

  alerttoken() {
    // this.showstorage()
    Alert.alert('my token', this.state.user)
  }

  // componentDidMount() {
  //   this._fetchInfo()
  // }

  getprotected() {
    fetch('http://10.0.3.2:3001/api/protected/random-quote', {
      headers: {
        // 'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.user
      }
    })
    .then((response) => response.text())
    .then((responseData) => {
      // Alert.alert('You JWT is:', responseData.id_token)
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      // AsyncStorage.setItem('STORAGE_KEY', responseData.id_token)
      // console.log(responseData)
      // Actions.welcome()
      Alert.alert(responseData)
    })
    // .then(Actions.welcome())
    .done()
  }

    userroute() {
    fetch('http://10.0.3.2:3001/api/protected/user', {
      headers: {
        // 'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.user
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Alert.alert('You JWT is:', responseData.id_token)
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      // AsyncStorage.setItem('STORAGE_KEY', responseData.id_token)
      // console.log(responseData)
      // Actions.welcome()
      Alert.alert("Friends:", responseData.friends[0])
    })
    // .then(Actions.welcome())
    .done()
  }

  logout() {
    AsyncStorage.removeItem('STORAGE_KEY');
    alert('You have been logged out.');
    Actions.login()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome!
          {this.props.username}
        </Text>

          <TouchableNativeFeedback onPress={this.alerttoken.bind(this)}>
            <View style={{width: 200, height: 50, backgroundColor: 'lightblue', margin: 5}}>
              <Text>Alert Token</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.getprotected.bind(this)}>
            <View style={{width: 200, height: 50, backgroundColor: 'lightblue', margin: 5}}>
              <Text>Get Protected</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.userroute.bind(this)}>
            <View style={{width: 200, height: 50, backgroundColor: 'lightblue', margin: 5}}>
              <Text>User Route</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.logout.bind(this)}>
            <View style={{width: 200, height: 50, backgroundColor: 'lightblue', margin: 5}}>
              <Text>Log Out</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={Actions.searchresults}>
            <View style={{width: 200, height: 50, backgroundColor: 'lightblue', margin: 5}}>
              <Text>Search Results</Text>
            </View>
          </TouchableNativeFeedback>

      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default LoggedIn;