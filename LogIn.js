import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  buttonClicked() {
    fetch('http://10.0.3.2:3001', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    });
  }  

  render() {
    const goToWelcome = () => Actions.welcome(this.state)
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
        <TouchableNativeFeedback onPress={this.buttonClicked.bind(this)}>
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