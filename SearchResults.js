import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  TouchableNativeFeedback
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import { Result } from './Result.js'

var fakedata = require('./FakeData.js')

class SearchResults extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // dataSource: ds.cloneWithRows([
      //   'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin','John', 'Joel', 
      //   'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin','John', 'Joel', 'James'
      // ])
      dataSource: ds.cloneWithRows(fakedata)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (

      <TouchableNativeFeedback style={styles.test}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.url }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.title}</Text>
              <Text style={styles.title}>{rowData.location}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableNativeFeedback>

    )
  }

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


  render() {
    return (

        <ListView

          dataSource={this.state.dataSource}
          // renderRow={(rowData) => <Text>{rowData}</Text>}
          renderRow={this.renderRow.bind(this)}
        />

    );
  }

}

const styles = StyleSheet.create({
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

export default SearchResults;