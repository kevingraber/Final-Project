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

var STORAGE_KEY = 'id_token';

class LogIn extends Component {

  // componentDidMount() {
  //   this._fetchInfo()
  // }

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  decideWhatTheFuckToDo(response) {
    console.warn(response.status)
    if (response.status == 401) {
      Alert.alert('Failure to authenticate', 'Your username/password was wrong')
      return
    } else if (response.status == 201) {
      Alert.alert('Authentication Successful', "You got it right")
      console.log(response)
    }
  }  

  // login() {
  //   fetch('http://10.0.3.2:3001/sessions/create', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //     })
  //   })
  //   // .then(this.decideWhatTheFuckToDo)
  //   // .then((response) => {
  //   //   console.log(response)
  //   //   response.json()
  //   // })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     // console.log(responseData)
  //     // console.log('lel')
  //   //   Alert.alert('You JWT is:', responseData.id_token)
  //   //   // this._onValueChange(STORAGE_KEY, responseData.id_token)
  //     console.log(responseData)
  //     if (responseData) {
  //       console.log('logged in')
  //     } else {
  //       console.log('not logged in')
  //     }
  //   })
  //   .done()
  //   // .then(Actions.welcome())
  // }

  // http://10.0.3.2:3001/sessions/create

    login() {
    fetch('http://ec2-52-90-83-128.compute-1.amazonaws.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      // Alert.alert('You JWT is:', responseData.id_token)
      // this._onValueChange(STORAGE_KEY, responseData.id_token)
      AsyncStorage.setItem('STORAGE_KEY', responseData.id_token)
      // console.log(responseData)
      Actions.welcome()
      // this.goToWelcome()
    }).catch((error) => {
        alert('Incorrect Login');
    })
    // .then(Actions.welcome())
    .done()
    // .then(Actions.welcome())
  }

  //   login() {
  //   fetch('http://10.0.3.2:3001/sessions/create', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password,
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     Alert.alert('You JWT is:', responseData.id_token)
  //     this._onValueChange(STORAGE_KEY, responseData.id_token)
  //     console.log(responseData)
  //   })
  //   .done()
  //   // .then(Actions.welcome())
  // }

  // // login() {
  // //   fetch('http://10.0.3.2:3001/sessions/create', {
  // //     method: 'POST',
  // //     headers: {
  // //       'Accept': 'application/json',
  // //       'Content-Type': 'application/json'
  // //     },
  // //     body: JSON.stringify({
  // //       username: this.state.username,
  // //       password: this.state.password,
  // //     })
  // //   })
  // //   .then((response) => {
  // //     console.log(response)
  // //   })
  // //   .then((responseData) => {
  // //     console.log(responseData)
  // //   })
  // //   .done()

  

  render() {
    const goToWelcome = () => Actions.welcome({username: this.state.username})
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Log In
        </Text>
        <TextInput 
          style={{width: 300}} 
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput 
          style={{width: 300}} 
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TouchableNativeFeedback onPress={this.login.bind(this)}>
          <View style={{width: 200, height: 50, backgroundColor: 'lightblue'}}>
            <Text>Log In!</Text>
          </View>
        </TouchableNativeFeedback>
{/*        <TouchableNativeFeedback onPress={goToWelcome}>
          <View style={{width: 200, height: 50, backgroundColor: 'lightblue'}}>
            <Text>Log In!</Text>
          </View>
        </TouchableNativeFeedback>*/}
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

export default LogIn;