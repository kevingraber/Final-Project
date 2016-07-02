import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }
  buttonClicked() {
    fetch('http://10.0.3.2:8080', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        picture: this.state.picture,
        bio: this.state.bio,
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
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username} 
        />
        <Text>{this.state.username}</Text>
        <TextInput
          secureTextEntry={true} 
          style={{width: 300}} 
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} 
        />
        <Text>{this.state.password}</Text>
        <TextInput
          secureTextEntry={true} 
          style={{width: 300}} 
          placeholder="Confirm Password"
          onChangeText={(confirmpassword) => this.setState({confirmpassword})}
          value={this.state.confirmpassword} 
        />
        <Text>{this.state.confirmpassword}</Text>
        <TextInput 
          style={{width: 300}} 
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} 
        />
        <Text>{this.state.email}</Text>
        <TextInput 
          style={{width: 300}} 
          placeholder="Picture"
          onChangeText={(picture) => this.setState({picture})}
          value={this.state.picture} 
        />
        <Text>{this.state.picture}</Text>
        <TextInput 
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
        <Text>{this.state.workzip}</Text>
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

export default SignUp;