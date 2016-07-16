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
  CameraRoll
} from 'react-native';

import BasicSwitch from './Switch.js'
import DatePickerComponent from './DatePickerComponent.js'

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width: Dimensions.get('window').width}}>
        <Text style={styles.welcome}>
          Create Account
        </Text>

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
        <Text>{this.state.address}</Text>

        <Text>Private?</Text>
        <BasicSwitch />

      {/*WILL BE DIFFERENT FOR IOS*/}
        <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
          <Picker.Item label="Java" value="java" />
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