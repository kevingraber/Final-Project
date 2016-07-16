import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableNativeFeedback,
  Alert
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import { Result } from './Result.js'

class GoingButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      going: false
    };
  }

  handleClick() {
    this.setState({going: !this.state.going})
  }

  render() {

    if (!this.state.going) {
      return (
        <TouchableNativeFeedback onPress={this.handleClick.bind(this)}>
          <View>
            <Text>
              Not Yet Going!
            </Text>
          </View>
        </TouchableNativeFeedback>
      )
    }

    return (
      <TouchableNativeFeedback onPress={this.handleClick.bind(this)}>
        <View>
          <Text>
            Going!
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
});

export default GoingButton;