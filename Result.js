import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';


class Result extends Component {
  render() {
    return (
        <View>
          <Text>
            {this.props.eventdata}
          </Text>
        </View>
    );
  }
}

export default Result;