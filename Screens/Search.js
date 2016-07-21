'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Text,
  StatusBar,
  View
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import StyleVars from './StyleVars';
import Button from './Button';
import DatePicker from 'react-native-datepicker';
import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-selectme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';

const Item = Picker.Item;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'white',
    flex: 1
  },
  searchContainer: {
    width: windowWidth*.9,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  startTimeContainer: {
    width: windowWidth*.3,
    marginLeft: 20,
  },
  endTimeContainer: {
    width: windowWidth*.3,
    marginTop: -60,
    marginLeft: (((windowWidth*.3)*2)),
  },
  catDropDown: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  distanceDropDown: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: (50),
    alignItems: "center",
  },
  zipcodeContainer: {
    width: windowWidth*.5,
    marginTop: -50,
    marginLeft: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  searchButton: {
    width: windowWidth*.5,
    marginTop: 40,
    marginLeft: 95,
    paddingVertical: 12
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    color: StyleVars.Colors.primary,
    fontFamily: StyleVars.Fonts.general,
    fontSize: 16,
    padding: 5
  },
  input2: {
    marginTop: 4,
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      start: new Date(),
      end: new Date(),
      distance: '',
      category: ''
    }
  }

  // componentDidMount() {
  //   updatePosition(this.refs['SELECT1']);
  //   updatePosition(this.refs['SELECT2']);
  //   updatePosition(this.refs['OPTIONLIST']);
  // }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _distance(howFar) {
    this.setState({
      ...this.state,
      distance: howFar
    });
  }

  _category(catz) {
    this.setState({
      ...this.state,
      category: catz
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#4ed7c2"
        />
        <ScrollView
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}
        >

          <View style={styles.searchContainer}>
            <Fumi
              style={styles.input2}
              label={'Search'}
              iconClass={MaterialIcons}
              iconName={'search'}
              iconColor={'#4ed7c2'}
              value={this.state.search}
              onChangeText={(search) => this.setState({ search: search })}
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.startTimeContainer}>
            <Text style={{textAlign: "center"}}> Start Time </Text>
            <DatePicker
              
              date={this.state.start}
              mode="time"
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(start) => {this.setState({start: start});}}
              showIcon={false}
            />
          </View>

          <View style={styles.endTimeContainer}>
          <Text style={{textAlign: "center"}}> End Time </Text>
            <DatePicker
              
              date={this.state.end}
              mode="time"
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(end) => {this.setState({end: end});}}
              showIcon={false}
            />
          </View>

          <View style={styles.distanceDropDown}>

            <Select
              width={windowWidth*.3}
              ref="SELECT1"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="Distance from"
              onSelect={this._distance.bind(this)}>
              <Option>5 miles</Option>
              <Option>10 miles</Option>
              <Option>25 miles</Option>
              <Option>50 miles</Option>
              <Option>100 miles</Option>
              <Option>250 miles</Option>
              <Option>500 miles</Option>
            </Select>

          </View>

          <View style={styles.zipcodeContainer}>
            <TextInput
              width={windowWidth*.9 }
              style={styles.input}
              value={this.state.workzip}
              placeholder="zipcode"
              autoFocus={true}
              onChangeText={(workzip) => this.setState({ workzip: workzip })}
              returnKeyType="done"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={{ height: 10 }}/>
          
          <View style={styles.catDropDown}>
            <Select
              width={windowWidth*.9}
              ref="SELECT2"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="Category"
              onSelect={this._category.bind(this)}>
              <Option>Sports</Option>
              <Option>Gaming</Option>
              <Option>Music</Option>
              <Option>Entertainment</Option>
              <Option>Sponsored</Option>
            </Select>
          </View>

            <View style={{ height: 20 }}></View>

          <Button
            // onPress={() => this.submitForm()}
            textStyle={{fontSize: 17}}
            style={styles.searchButton}
          >
          {"Search"}
          </Button>


        </ScrollView>
        <OptionList overlayStyles={{backgroundColor:'#fff'}} ref="OPTIONLIST"/>
      </View>
    );
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }


  
}

export default Search;
