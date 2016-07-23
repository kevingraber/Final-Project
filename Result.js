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
  AsyncStorage
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GoingButton from './GoingButton.js'
import UserList from './UserList.js'
import FavoriteButton from './FavoriteButton.js'

var moment = require('moment')


class Result extends Component {

  componentWillMount() {
    AsyncStorage.getItem('STORAGE_KEY').then((token) => {
      this.setState({
        user: token
      });
    });
  }

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
  //   var REQUEST_URL = 'http://ec2-52-90-83-128.compute-1.amazonaws.com/events/' + eventID;
    
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
    var REQUEST_URL = 'http://ec2-52-90-83-128.compute-1.amazonaws.com/events/' + eventID;
    
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          // console.log(responseData)

          this.setState({
            image: responseData[0].image,
            name: responseData[0].name,
            id: responseData[0]._id,
            // location_name: responseData.location_name,
            location_name: responseData[0].location_name,
            date_time: moment(responseData[0].date_time).format("MMMM Do"),
            description: responseData[0].description,
            // time: responseData.time,
            time: moment(responseData[0].date_time).format("h:mm A"),
            attendees: responseData[0].attendees.in,
            // going: responseData.going,
            // test: responseData.test,
            // attendees: responseData.attendees,
            loaded: true,
            dataSource: this.state.dataSource.cloneWithRows(responseData[0].attendees.in),
            numberGoing: responseData[0].attendees.in.length,
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

  nowGoing() {

    console.log("you pressed me")

    fetch('http://ec2-52-90-83-128.compute-1.amazonaws.com/eventIn', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Token': this.state.user
          }),
          body: JSON.stringify({
              // userID: "57807b2ef43b505b2bfc1b14",
              eventID: this.props.eventID
          })
      })
        // .then((response) => console.log(response))
        .then((response) => response.json())
        .then((responseData) => {
              //AsyncStorage.setItem('STORAGE_KEY', responseData.id_token)
              Alert.alert("Have Fun!")
          }).catch((error) => {
              alert('Server Error - Please Try Back Later');
      });

  }

  componentDidMount() {
    // this.stopPostListener = DataStore.listen(this.onListChange.bind(this));
    // Actions.loadPosts();
    // Alert.alert(this.props)
    this.fetchData(this.props.eventID);
  }

  rowPressed(UserData) {
    console.log(UserData)
    Actions.userlist({UserData: UserData})
  }

  render() {

    if (!this.state.loaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
        <ScrollView style={{backgroundColor:'#E9E9EF'}}>
          <Image style={styles.image} source={{ uri: this.state.image }} />

          <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}} >
            <Text style={{fontFamily: 'sans-serif-light', fontSize:25, margin: 10}} > {this.state.name} </Text>
            <Text style={{marginBottom: 10}} > {this.state.description} </Text>
          </View>

          {/*<View style={{flexDirection:'row', justifyContent:'space-around', margin: 15}}>
            <View style={{height:50, width:50, backgroundColor:"#e76248", borderRadius: 25, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'white', fontWeight:'bold'}}>In</Text>
            </View>
            <View style={{height:50, width:50, backgroundColor:"#4ed7c2", borderRadius: 25, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'white', fontWeight:'bold'}}>Out</Text>
            </View>
            <MaterialIcons name="check-circle" size={50} color="#e76248" />
            <MaterialIcons name="event-available" size={50} color="#e76248" />
            <MaterialIcons name="star" size={50} color="#e76248" />
            <MaterialIcons name="remove-circle" size={50} color="#e76248" />
          </View>*/}

          {/*<Text>
            Title: {this.state.name}
          </Text>*/}

          <View style={styles.center}>

            <View style={styles.infoContainer}>
              <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="event" size={30} color="#e76248" />
              <Text style={{fontFamily: 'sans-serif-light'}}> {this.state.date_time} </Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="access-time" size={30} color="#e76248" />
              <Text style={{fontFamily: 'sans-serif-light'}}> {this.state.time} </Text>
            </View>

            <View style={styles.infoContainer}>
              <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="place" size={30} color="#e76248" />
              <Text style={{fontFamily: 'sans-serif-light'}}> {this.state.location_name} </Text>
            </View>

            <TouchableNativeFeedback onPress={() => this.rowPressed(this.state.attendees)}>
              <View style={styles.infoContainer}>
                <MaterialIcons  style={{marginRight: 20, marginLeft: 20}} name="face" size={30} color="#e76248" />
                <Text style={{fontFamily: 'sans-serif-light'}}> {this.state.numberGoing} People Going</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="keyboard-arrow-right" size={30} color="#e76248" />
                </View>
              </View>
            </TouchableNativeFeedback>

          </View>

          {/*<Text>
            {this.props.eventID}
          </Text>*/}

          <View  style={styles.center}>
            <TouchableNativeFeedback  onPress={this.nowGoing.bind(this)}>
              <View style={{height:50, width:100, borderRadius:50, margin:10, backgroundColor: '#4ed7c2', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'white'}}>Going?</Text>
              </View>
            </TouchableNativeFeedback>
            {/*<GoingButton onPress={this.nowGoing.bind(this)} />
            <FavoriteButton />*/}
            {/*<MaterialIcons style={{marginRight: 20, marginLeft: 20}} name="favorite-border" size={30} color="#e76248" />*/}
          </View>

          {/*<Text> {this.state.numberGoing} people are attending </Text>*/}

          {/*<ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />*/}
        </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
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


export default Result;