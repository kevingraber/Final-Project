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
  Picker
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

var moment = require('moment')


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      distance: '',
      category: ''
    }
  }


  render() {

    return (
      <View>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(cat) => this.setState({category: cat})}>
          <Picker.Item label="Category" value='' />
          <Picker.Item label="Sports" value="Sports" />
          <Picker.Item label="Gaming" value="Gaming" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Music" value="Music" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Sponsored" value="Sponsored" />
        </Picker>
        <TextInput style={styles.input} placeholder='Zipcode' />
        <Picker
          selectedValue={this.state.distance}
          onValueChange={(radius) => this.setState({distance: radius})}>
          <Picker.Item label="5" value='5' />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="25" value="25" />
        </Picker>
        <TouchableNativeFeedback>
          <View>
            <Text>Search</Text>
          </View>
        </TouchableNativeFeedback>
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
    width: windowWidth,
    height: 175,
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