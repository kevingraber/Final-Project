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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Result } from './Result.js'

class FavoriteButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: false
    };
  }

  handleClick() {
    this.setState({favorite: !this.state.favorite})
  }

  render() {

    if (!this.state.favorite) {
      return (

        <MaterialIcons 
        onPress={this.handleClick.bind(this)} 
        style={{marginRight: 20, marginLeft: 20}} 
        name="favorite-border" 
        size={30} 
        color="#e76248" 
        />

      )
    }

    return (

        <MaterialIcons 
        onPress={this.handleClick.bind(this)}
        style={{marginRight: 20, marginLeft: 20}} 
        name="favorite" 
        size={30} 
        color="#e76248" 
        />

    )
  }

}



export default FavoriteButton;