'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import StyleVars from './StyleVars';

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
    paddingVertical: 9,
    paddingHorizontal: 15,
    margin: 5,
    overflow: "hidden",
    backgroundColor: StyleVars.Colors.primary
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  }
});

class Button extends React.Component {
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={() => this.onPress()}
        style={[styles.button, this.props.style]}
      >
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    if (this.props.enabled) {
      this.props.onPress();
    }
  }
}

// Button.PropTypes = {
//   onPress: PropTypes.func,
//   style: View.propTypes.style,
//   textStyle: Text.propTypes.style,
//   activeOpacity: PropTypes.number,
//   enabled: PropTypes.bool,
//   children: PropTypes.string
// };

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default Button;
