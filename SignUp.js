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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
        passwordConfirm: null
    };
  }
  signup() {
    fetch('http://ec2-52-90-83-128.compute-1.amazonaws.com/newuser', {
      method: 'POST',
      body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
      })
    });
  }

    render() {
        var signupButton;

        if (this.state.password === this.state.passwordConfirm) {
            signupButton = <SignUpButton />;
        } else {
            signupButton = <SignUpPassDontMatch />;
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#4ed7c2"
                    // barStyle="light-content"
                />
                <View>
                    <Image  style={{width: windowWidth*.70}} resizeMode='contain' source={require('./Images/login.png')} />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="EMAIL"
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{margin: 5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({passwordConfirm})}
                        value={this.state.passwordConfirm}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableNativeFeedback onPress={this.signup.bind(this)}>
                    {signupButton}
                </TouchableNativeFeedback>

                <Text style={{color: '#c0cac9', marginTop: 25}}>
                    Already a member? <Text onPress={() => Actions.signup()} style={{color: '#e76248', textDecorationLine: 'underline'}}>Login here!</Text>
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

export default SignUp;