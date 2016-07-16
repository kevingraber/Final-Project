import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  Alert
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import GoingButton from './GoingButton.js'


class Result extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      loaded: false
    };
  }

  fetchData(eventID) {
    var REQUEST_URL = 'http://10.0.3.2:3001/events/' + eventID;
    
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            image: responseData.url,
            title: responseData.title,
            location: responseData.location,
            date: responseData.date,
            going: responseData.going,
            test: responseData.test,
            loaded: true
          });
        })
        .done();
  }

  componentDidMount() {
    // this.stopPostListener = DataStore.listen(this.onListChange.bind(this));
    // Actions.loadPosts();
    // Alert.alert(this.props)
    this.fetchData(this.props.eventID);
  }

  render() {

    if (!this.state.loaded) {
      return (
        <View>
          <Image style={styles.image} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Donald_Trump_August_19,_2015_(cropped).jpg/220px-Donald_Trump_August_19,_2015_(cropped).jpg" }} />
        </View>
      )
    }

    return (
        <View>
        <Image style={styles.image} source={{ uri: this.state.image }} />
          <Text>
            {}
          </Text>
          <Text>
            Date: {this.state.date}
          </Text>
          <Text>
            More Info
          </Text>
          <Text>
            {this.props.eventID}
          </Text>
          <GoingButton />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
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


export default Result;