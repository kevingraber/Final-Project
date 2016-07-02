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

class LogIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Log In
        </Text>
        <TextInput style={{width: 300}} placeholder="Username"/>
        <TextInput style={{width: 300}} placeholder="Password"/>
        <TouchableNativeFeedback>
          <View style={{width: 200, height: 50, backgroundColor: 'lightblue'}}>
            <Text>Log In!</Text>
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

export default LogIn;