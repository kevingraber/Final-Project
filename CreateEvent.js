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
  TouchableWithoutFeedback,
    AsyncStorage,
    Alert,
    Image,
    StatusBar
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
            name: null,
            zip: null,
            location_name: null,
            description: null,
            date_time: null,
            tags: null,
            image: null,
            private: false,
            user: null
        };
      }

    componentWillMount() {
        AsyncStorage.getItem('STORAGE_KEY').then((token) => {
            this.setState({
                user: token
            });
        });
    }

    buttonClicked() {
        // fetch('http://10.0.3.2:8080', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     eventName: this.state.eventName,
        //     description: this.state.description,
        //     tags: this.state.tags,
        //     address: this.state.address,
        //     location: this.state.location,
        //     age: this.state.age,
        //     homezip: this.state.homezip,
        //     workzip: this.state.workzip
        //   })
        // });
        this.createEvent();
    }

    createEvent() {
        fetch('http://ec2-52-90-83-128.compute-1.amazonaws.com/newEvent', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Token': this.state.user
            }),
            body: JSON.stringify({
                name: this.state.name,
                zip: this.state.zip,
                location_name: this.state.location_name,
                description: this.state.description,
                date_time: this.state.date_time,
                tags: this.state.tags,
                image: this.state.image,
                private: this.state.private
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                //Alert.alert('my token',JSON.stringify(responseData));
                AsyncStorage.setItem('STORAGE_KEY', responseData.id_token);
                Actions.welcome();
            }).catch((error) => {
                alert('Server Error Please Try Back Later');
            });
    }

  render() {
    return (
        <View style={styles.container}>

                <StatusBar
                    backgroundColor="#4ed7c2"
                    // barStyle="light-content"
                />
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Event Name"
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Date"
                        onChangeText={(date_time) => this.setState({date_time})}
                        value={this.state.date_time}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={3}
                        placeholder="Description"
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="zip"
                        onChangeText={(zip) => this.setState({zip})}
                        value={this.state.zip}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Location Name"
                        onChangeText={(location_name) => this.setState({location_name})}
                        value={this.state.location_name}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tags"
                        onChangeText={(tags) => this.setState({tags})}
                        value={this.state.tags}
                    />
                </View>

                <Text>Private?</Text>
                <BasicSwitch />

                <TouchableNativeFeedback onPress={this.buttonClicked.bind(this)}>
                    <View style={styles.button}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto'}}>CREATE EVENT</Text>
                    </View>
                </TouchableNativeFeedback>

          </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    input: {
        height: 40,
        width: windowWidth*.70,
        backgroundColor: '#c0cac9',
        fontFamily: 'Roboto',
        fontWeight: '100',
        justifyContent: 'center',
        textAlign: 'center',
        opacity: .5
    },
    button: {
        backgroundColor: "#4ed7c2",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: windowWidth*.70,
        margin: 5
    },
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