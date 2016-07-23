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
  Alert,
  Dimensions
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Result } from './Result.js'

var moment = require('moment')

// var fakedata = require('./FakeData.js')

class SearchResults extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      refreshing: false,
      loaded: false,
    };
  }

  // Local:
  // http://10.0.3.2:3001/events

  // Production
  // http://ec2-52-90-83-128.compute-1.amazonaws.com/events

  // fetchData() {
  //   var REQUEST_URL = 'http://ec2-52-90-83-128.compute-1.amazonaws.com/events';
    
  //   fetch(REQUEST_URL)
  fetchData(searchInfo) {

    var jsonSearchInfo = JSON.stringify(searchInfo);

    var REQUEST_URL = 'http://ec2-52-90-83-128.compute-1.amazonaws.com/events/search';

    fetch(REQUEST_URL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: jsonSearchInfo
    })
        .then((response) => response.json())
        .then((responseData) => {
          console.log('are we getting here');
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            // loaded: true,
          });
        })
        .done();
  }

  rowPressed(eventID) {
    // Alert.alert(eventID)
    Actions.eventpage({eventID: eventID})
  }

  componentDidMount() {
    // this.stopPostListener = DataStore.listen(this.onListChange.bind(this));
    // Actions.loadPosts();
    // this.fetchData();
    if (!this.props.searchInfo){
      var searchInfo = {type:'all'};
      this.fetchData(searchInfo);
    } else {
      this.fetchData(this.props.searchInfo);
    }
  }

  // renderRow(rowData, sectionID, rowID) {
  //   return (

  //     <TouchableNativeFeedback onPress={() => this.rowPressed(rowData.id)} style={styles.test}>
  //       <View>
  //         <View style={styles.rowContainer}>
  //           <Image style={styles.thumb} source={{ uri: rowData.url }} />
  //           <View  style={styles.textContainer}>
  //             <Text style={styles.price}>{rowData.title}</Text>
  //             <Text style={styles.title}>{rowData.location}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.separator}/>
  //       </View>
  //     </TouchableNativeFeedback>

  //   )
  // }
  // renderRow(rowData, sectionID, rowID) {
  //   return (
      
  //     <TouchableNativeFeedback onPress={() => this.rowPressed(rowData._id)} style={styles.test}>
  //       <View>
  //         <View style={styles.rowContainer}>
  //           <Image style={styles.thumb} source={{ uri: rowData.image }} />
  //           <View  style={styles.textContainer}>
  //             <Text style={styles.price}>{rowData.name}</Text>
  //             <Text style={styles.title}>{rowData.location_name}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.separator}/>
  //       </View>
  //     </TouchableNativeFeedback>

  //   )
  // }



  // renderRowData(data: Object) {
  //   return(
  //     <View>
  //       <Text>{data.title}</Text>
  //       <Text>{data.location}</Text>
  //       <Text>{data.date}</Text>
  //     </View>
  //   )
  // }

  // _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
  //   return (

  //       <View>
  //         <View>
  //           <Text>
  //             {rowData}
  //           </Text>
  //         </View>
  //       </View>

  //   );
  // }

  // Facebook Style Layout
  // renderRow(rowData, sectionID, rowID) {
  //   return (
  //     <View>
  //       <TouchableNativeFeedback onPress={() => this.rowPressed(rowData._id)} style={styles.test}>
  //         <View>
  //           <View style={styles.rowContainer}>
  //             <Image  style={styles.image} source={{ uri: rowData.image }} />
  //           </View>
  //           <View style={styles.rowContainer}>
  //             <View style={styles.dateContainer}>
  //               <View style={styles.dateNumber}>
  //                 <Text style={{fontSize: 40, fontWeight: 'bold', color: "white"}}> {rowData.day} </Text>
  //               </View>
  //             </View>
  //             <View  style={styles.textContainer}>
  //               <Text style={styles.title}>{rowData.name}</Text>
  //               <Text style={styles.title}>{rowData.location_name}</Text>
  //               <Text style={styles.title}>{rowData.town}</Text>
  //             </View>
  //           </View>
  //         </View>
  //       </TouchableNativeFeedback>
  //       <View style={styles.separator} />
  //     </View>
  //   )
  // }

  // Text Over Picture Layout
  // renderRow(rowData, sectionID, rowID) {
  //   return (
  //     <View>
  //       <TouchableNativeFeedback onPress={() => this.rowPressed(rowData._id)} style={styles.test}>
  //         <View>
  //           <View style={styles.rowContainer}>
  //             <Image  style={styles.image} source={{ uri: rowData.image }}>
  //               <View style={styles.innerText}>
  //                 <Text style={styles.price}>{rowData.name}</Text>
  //                 <Text style={styles.title}>{rowData.location_name}</Text>
  //                 <Text style={styles.title}>{rowData.date}</Text>
  //               </View>
  //             </Image>
  //           </View>
  //         </View>
  //       </TouchableNativeFeedback>
  //       <View style={styles.separator} />
  //     </View>
  //   )
  // }

  // BOTH TOGETHER MUAHAHAHAH
  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <TouchableNativeFeedback onPress={() => this.rowPressed(rowData._id)} style={styles.test}>
          <View>
            <View style={styles.rowContainer}>
              <Image  style={styles.image} source={{ uri: rowData.image }}>
                <View style={styles.innerText}>
                  <Text style={styles.price}>{rowData.name}</Text>
                </View>
              </Image>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.dateContainer}>
                <View style={styles.dateNumber}>
                  <Text style={{fontSize: 40, fontWeight: 'bold', color: "white"}}> {moment(rowData.date_time).format("D")} </Text>
                  {/*<Text style={{fontSize: 40, fontWeight: 'bold', color: "white"}}> {rowData.day} </Text>*/}
                </View>
              </View>
              <View  style={styles.textContainer}>
                <Text style={styles.smallText}>{moment(rowData.date_time).format("h:mm A")}</Text>
                {/*<Text style={styles.smallText}>{rowData.time}</Text>*/}
                <Text style={styles.smallText}>{rowData.location_name}</Text>
                <Text style={styles.smallText}>{rowData.town}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.separator} />
      </View>
    )
  }


  render() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
    );
  }

}

// BOTH TOGETHER MUAHAHAHA
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 150,
    marginRight: 10,
  },
    textContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 10
  },
  bottomBorder: {
    height: 1,
    backgroundColor: 'gray'
  },
  separator: {
    height: 10,
    backgroundColor: '#dddddd'
  },
  innerText: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    margin: 5
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 1,
      width: 0
    }
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 1,
      width: 0
    },
  },
  rowContainer: {
    flexDirection: 'row',
  },
  dateNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateContainer: {
    width:75,
    // backgroundColor: 'white',
    backgroundColor: '#e76248',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 1,
    // borderRightColor: '#c0cac9'
  },
  smallText: {
    // color: '#656565'
    color: '#e76248',
    // fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 13
  },

});

// Text Over Picture Layout
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const styles = StyleSheet.create({
//   image: {
//     width: windowWidth,
//     height: 150,
//     marginRight: 10,
//   },
//   dateContainer: {
//     width:50,
//     backgroundColor: 'white',
//   },
//   textContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   bottomBorder: {
//     height: 2,
//     backgroundColor: '#e76248'
//   },
//   separator: {
//     height: 10,
//     backgroundColor: '#dddddd'
//   },
//   innerText: {
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     flex: 1,
//     margin: 5
//   },
//   price: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'white',
//     textShadowRadius: 10,
//     textShadowColor: 'black',
//     textShadowOffset: {
//       height: 1,
//       width: 0
//     }
//   },
//   title: {
//     color: 'white',
//     fontWeight: 'bold',
//     textShadowRadius: 10,
//     textShadowColor: 'black',
//     textShadowOffset: {
//       height: 1,
//       width: 0
//     },
//   },
//   rowContainer: {
//     flexDirection: 'row',
//   },
// });

// Facebook Style Layout
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const styles = StyleSheet.create({
//   image: {
//     width: windowWidth,
//     height: 150,
//     marginRight: 10
//   },
//   dateContainer: {
//     width:75,
//     // backgroundColor: 'white',
//     backgroundColor: '#e76248',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderRightWidth: 1,
//     // borderRightColor: '#c0cac9'
//   },
//   dateNumber: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 5,
//     paddingLeft: 10
//   },
//   bottomBorder: {
//     height: 2,
//     backgroundColor: '#e76248'
//   },
//   separator: {
//     height: 10,
//     backgroundColor: '#dddddd'
//   },
//   price: {
//     color: '#4ed7c2'
//   },
//   title: {
//     // color: '#656565'
//     color: '#e76248',
//     // fontWeight: 'bold',
//     fontFamily: 'sans-serif',
//     fontSize: 13
//   },
//   rowContainer: {
//     flexDirection: 'row',
//   },
// });

export default SearchResults;