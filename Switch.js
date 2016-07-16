import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Switch
} from 'react-native';

class BasicSwitch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  }

  // getInitialState() {
  //   return {
  //     trueSwitchIsOn: true,
  //     falseSwitchIsOn: false,
  //   };
  // }

  render() {
    return (
      <View>
        <Switch
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 10}}
          value={this.state.falseSwitchIsOn} />
      </View>
    );
  }

}

export default BasicSwitch;