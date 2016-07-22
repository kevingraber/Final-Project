import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  Picker,
  CameraRoll,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableWithoutFeedback
} from 'react-native';

import BasicSwitch from './Switch.js'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presetDate: new Date(),
      presetText: 'Pick a dateee',
      simpleText: 'pick a time',
      presetHour: 10,
      presetMinute: 30,
      timeText: 'Pick a time, default: 10:30 AM',
      // username: null,
      // password: null,
    };
  }
  buttonClicked() {
    fetch('http://10.0.3.2:8080', {
      method: 'POST',
      body: JSON.stringify({
        eventName: this.state.eventName,
        description: this.state.description,
        category: this.state.category,
        address: this.state.address,
        location: this.state.location,
        age: this.state.age,
        homezip: this.state.homezip,
        workzip: this.state.workzip,
      })
    });
  }

  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
      console.log(newState)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

  async showTimePicker(stateKey, options) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        // newState[stateKey + 'Text'] = formatTime(hour, minute);
        let amORpm = 'AM'
        if (hour >= 12 ) { 
          amORpm = 'PM' 
        }
        newState[stateKey + 'Text'] = (hour > 12 ? (hour - 12) : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + amORpm;
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      }
      this.setState(newState);
      console.log(newState)
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width: Dimensions.get('window').width}}>

        <TextInput 
          style={{width: 300}} 
          placeholder="Event Name"
          onChangeText={(eventName) => this.setState({eventName})}
          value={this.state.eventName} 
        />
        <Text>{this.state.eventName}</Text>

        <TextInput
          multiline={true}
          numberOfLines={3}
          style={{width: 300}} 
          placeholder="Description"
          onChangeText={(description) => this.setState({description})}
          value={this.state.description} 
        />
        <Text>{this.state.description}</Text>

        <TextInput 
          style={{width: 300}} 
          placeholder="Category"
          onChangeText={(category) => this.setState({category})}
          value={this.state.category} 
        />
        <Text>{this.state.category}</Text>

        <TextInput 
          style={{width: 300}} 
          placeholder="location"
          onChangeText={(location) => this.setState({location})}
          value={this.state.location} 
        />
        <Text>{this.state.location}</Text>

        <TextInput 
          style={{width: 300}} 
          placeholder="address"
          onChangeText={(address) => this.setState({address})}
          value={this.state.address} 
        />

        <TouchableNativeFeedback onPress={this.showPicker.bind(this, 'preset', {date: new Date(), minDate: new Date()})}>
          <View>
            <Text>{this.state.presetText}</Text>
          </View>
        </TouchableNativeFeedback>

        {/*<TouchableWithoutFeedback
          onPress={this.showTimePicker.bind(this, 'simple')}>
          <View>
            <Text style={styles.text}>{this.state.simpleText}</Text>
          </View>
        </TouchableWithoutFeedback>*/}

        <TouchableWithoutFeedback
          onPress={this.showTimePicker.bind(this, 'time', {
            hour: this.state.presetHour,
            minute: this.state.presetMinute,
          })}>
          <View>
          <Text style={styles.text}>{this.state.timeText}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Text>{this.state.address}</Text>

        <Text>Private?</Text>
        <BasicSwitch />

      {/*WILL BE DIFFERENT FOR IOS*/}
        <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Category" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

          

        {/*<TextInput 
          style={{width: 300}} 
          placeholder="Bio"
          onChangeText={(bio) => this.setState({bio})}
          value={this.state.bio} 
        />
        <Text>{this.state.bio}</Text>

        <TextInput 
          style={{width: 300}} 
          placeholder="Age"
          onChangeText={(age) => this.setState({age})}
          value={this.state.age} 
        />
        <Text>{this.state.age}</Text>

        <TextInput 
          style={{width: 300}} 
          placeholder="Home Zip"
          onChangeText={(homezip) => this.setState({homezip})}
          value={this.state.homezip} 
        />
        <Text>{this.state.homezip}</Text>



        <TextInput 
          style={{width: 300}} 
          placeholder="Work Zip"
          onChangeText={(workzip) => this.setState({workzip})}
          value={this.state.workzip} 
        />
        <Text>{this.state.workzip}</Text>*/}

        </ScrollView>
        <TouchableNativeFeedback onPress={this.buttonClicked.bind(this)} >
          <View style={{width: 200, height: 50, backgroundColor: 'lightblue'}}>
            <Text>Submit</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default CreateEvent;