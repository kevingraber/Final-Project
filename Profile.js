import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  Alert,
  TouchableNativeFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

var moment = require('moment')


class Search extends Component {


  render() {

    return (
      <View>
        <Image style={styles.image} source={{uri: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13094190_10101052751294856_94502647272426993_n.jpg?oh=4cd32dd8b088a3efd8532ec79b9e188d&oe=581B8774'}}/>
        <Text>email</Text>
        <Text>password</Text>
        <Text>bio</Text>
        <Text>age</Text>
        <Text>homezip</Text>
        <Text>workzip</Text>
        <Text>friends</Text>
      </View>
    )

  }

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "lightgray",
    color: '#4ed7c2',
    fontSize: 16,
    padding: 5
  },
  center: {
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    width: windowWidth*.8,
    borderRadius: 10,
    margin: 5
  },
  image: {
    width: windowWidth*.5,
    height: windowWidth*.5,
    borderRadius: 150
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  test: {
    margin: 10,
    backgroundColor: '#C0FF00'
  }
});


export default Search;