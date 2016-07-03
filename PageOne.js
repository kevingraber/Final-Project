import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
  render() {
    return (
      <View style={{marginTop: 100, marginLeft: 100}}>
      	<Text style={{margin: 20}}>Welcome to Gruup Up!</Text>
      	<Text style={{margin: 20}} onPress={Actions.login}>Log In!</Text>
        <Text style={{margin: 20}} onPress={Actions.signup}>Sign Up!</Text>
        <Text style={{margin: 20}} onPress={Actions.welcome}>Welcome</Text>
      </View>
    )
  }
}