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
  Alert,
  Image,
  StatusBar
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
      // Actions.welcome()
      Actions.tabbed()
      // this.goToWelcome()
    }).catch((error) => {
        alert('Incorrect Login');
    })
    // .then(Actions.welcome())
    .done()
    // .then(Actions.welcome())
  }

  render() {
    const goToWelcome = () => Actions.welcome({username: this.state.username})

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#4ed7c2"
      />
        <View>
          <Image  style={{width: windowWidth*.70}} resizeMode='contain' source={require('./Images/login.png')} />
        </View>
        <View style={{margin: 5}}>
          <TextInput
            style={styles.input} 
            placeholder="EMAIL"
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
        </View>
        <View style={{margin: 5}}>
          <TextInput 
            style={styles.input} 
            placeholder="PASSWORD"
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true} 
          />
        </View>
        <TouchableNativeFeedback onPress={this.login.bind(this)}>
          <View style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto'}}>SIGN IN</Text>
          </View>
        </TouchableNativeFeedback>

        <Text style={{color: '#c0cac9', marginTop: 25}}>
          Not a member? <Text onPress={() => Actions.signup()} style={{color: '#e76248', textDecorationLine: 'underline'}}>Register here!</Text>
        </Text>

        <Text style={{color: '#c0cac9', margin: 10}}>
          Forgot password? <Text style={{color: '#e76248', textDecorationLine: 'underline'}}>Reset it!</Text>
        </Text>

      </View>
    );
  }

}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    height: 40,
    width: windowWidth*.70,
    backgroundColor: '#c0cac9',
    fontFamily: 'Roboto',
    fontWeight: '100',
    justifyContent: 'center',
    textAlign: 'center',
    opacity: .5
  },
  button: {
    backgroundColor: "#4ed7c2",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: windowWidth*.70,
    margin: 5
  },
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