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
    AsyncStorage,
    Alert,
    Image,
    StatusBar
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            bio: null,
            age: null,
            homezip: null,
            workzip: null
        };
    }
    updateuser() {
        fetch('http://ec2-52-90-83-128.compute-1.amazonaws.com/updateUser', {
            method: 'POST',
            body: JSON.stringify({
                userID: "577f1845eb8067b01fd5ea28",
                changes: {
                    picture: this.state.picture,
                    bio: this.state.bio,
                    age: this.state.age,
                    homezip: this.state.homezip,
                    workzip: this.state.workzip
                }
            })
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
                        placeholder="Picture 2"
                        onChangeText={(picture) => this.setState({picture})}
                        value={this.state.picture}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        onChangeText={(bio) => this.setState({bio})}
                        value={this.state.bio}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        onChangeText={(age) => this.setState({age})}
                        value={this.state.age}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Home Zip"
                        onChangeText={(homezip) => this.setState({homezip})}
                        value={this.state.homezip}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Work Zip"
                        onChangeText={(workzip) => this.setState({workzip})}
                        value={this.state.workzip}
                    />
                </View>
                <TouchableNativeFeedback onPress={this.updateuser.bind(this)}>
                    <View style={styles.button}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto'}}>UPDATE USER</Text>
                    </View>
                </TouchableNativeFeedback>

                <Text style={{color: '#c0cac9', margin: 10}}>
                    Need to change your password? <Text style={{color: '#e76248', textDecorationLine: 'underline'}}>Reset it!</Text>
                </Text>

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

export default UpdateUser;