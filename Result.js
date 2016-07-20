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
  Dimensions
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GoingButton from './GoingButton.js'


class Result extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      image: "",
      loaded: false
    };
  }

  // Local 
  // http://10.0.3.2:3001/events/

  // Production
  // http://ec2-52-90-83-128.compute-1.amazonaws.com/events/

  // fetchData(eventID) {
  //   var REQUEST_URL = 'http://10.0.3.2:3001/events/' + eventID;
    
  //   fetch(REQUEST_URL)
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //         console.log(responseData)
  //         console.log(responseData[0])

  //         this.setState({
  //           image: responseData[0].image,
  //           name: responseData[0].name,
  //           location_name: responseData[0].location_name,
  //           date_time: responseData[0].date_time,
  //           description: responseData[0].description,
  //           // going: responseData.going,
  //           // test: responseData.test,
  //           // attendees: responseData.attendees,
  //           loaded: true,
  //           // dataSource: this.state.dataSource.cloneWithRows(responseData.attendees),
  //         });
  //       })
  //       .done();
  // }

    fetchData(eventID) {
    var REQUEST_URL = 'http://10.0.3.2:3001/events/' + eventID;
    
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          console.log(responseData)

          this.setState({
            image: responseData.image,
            name: responseData.name,
            location_name: responseData.location_name,
            date_time: responseData.date,
            description: responseData.description,
            // going: responseData.going,
            // test: responseData.test,
            // attendees: responseData.attendees,
            loaded: true,
            dataSource: this.state.dataSource.cloneWithRows(responseData.attendees),
          });
        })
        .done();
  }

  renderRow(rowData, sectionID, rowID) {
    return (

      <TouchableNativeFeedback>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.picture }} />
            <View style={styles.textContainer}>
              <Text>{rowData.username}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>

    )
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
            Title: {this.state.name}
          </Text>

          <View style={styles.infoContainer}>
            <MaterialIcons name="event" size={30} color="#e76248" />
            <Text> {this.state.date_time} </Text>
          </View>

          <View style={styles.infoContainer}>
            <MaterialIcons name="description" size={30} color="#e76248" />
            <Text> Description: {this.state.description} </Text>
          </View>

          <View style={styles.infoContainer}>
            <MaterialIcons name="access-time" size={30} color="#e76248" />
            <Text> {this.state.date_time} </Text>
          </View>

          <View style={styles.infoContainer}>
            <MaterialIcons name="place" size={30} color="#e76248" />
            <Text> {this.state.location_name} </Text>
          </View>

          <Text>
            {this.props._id}
          </Text>
          <View style={styles.center}>
            <GoingButton />
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 30
  },
  image: {
    width: windowWidth,
    height: 200,
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


export default Result;