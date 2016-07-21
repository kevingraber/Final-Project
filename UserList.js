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
  ScrollView
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

class UserList extends Component {

// getInitialState() {
//   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//   return {
//     dataSource: ds.cloneWithRows(this.props.UserData),
//   };
// }  

/*  constructor(props) {

    super(props);

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      // dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      dataSource: ds.cloneWithRows(this.props.UserData)
    };

  }*/

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
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
        <View style={styles.separator} />
      </View>

    )
  }

  // dataSource: this.state.dataSource.cloneWithRows(responseData.attendees)

  render() {

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return(
      <ListView
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(this.props.UserData)}
        renderRow={this.renderRow.bind(this)}
      />
    )
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
    padding: 10,
    // backgroundColor: 'white'
  },
  test: {
    margin: 10,
    backgroundColor: '#C0FF00'
  }
});


export default UserList;