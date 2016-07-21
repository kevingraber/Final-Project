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

import StyleVars from './StyleVars';
import Button from './Button';
import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-selectme';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  txtInput: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    width: Dimensions.get("window").width - 100,
    marginBottom: 5,
  },
  subButton: {
    width: Dimensions.get("window").width - 200,
    marginTop: 20,
    marginLeft: 95,
    marginBottom: 20,
    paddingVertical: 12
  },
  dropDown: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: null,
      // password: null,
    };
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  buttonClicked() {
    fetch('http://10.0.3.2:8080', {
      method: 'POST',
      body: JSON.stringify({
        eventName: this.state.eventName,
        description: this.state.description,
        category: this.state.category,
        address: this.state.address,
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

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="Event Name"
            onChangeText={(eventName) => this.setState({eventName})}
            value={this.state.eventName} 
          />
        </View>

        <View style={styles.center}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={styles.txtInput} 
            placeholder="Description"
            onChangeText={(description) => this.setState({description})}
            value={this.state.description} 
          />
        </View>

        <View style={styles.dropDown}>
          <Select
            width={250}
            ref="SELECT2"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Category"
            value={this.state.category} 
            onSelect={(category) => this.setState({category})}>
            <Option>Sports</Option>
            <Option>Gaming</Option>
            <Option>Music</Option>
            <Option>Entertainment</Option>
            <Option>Sponsored</Option>
          </Select>
        </View>

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="address"
            onChangeText={(address) => this.setState({address})}
            value={this.state.address} 
          />
        </View>

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="Bio"
            onChangeText={(bio) => this.setState({bio})}
            value={this.state.bio} 
          />
        </View>

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="Age"
            onChangeText={(age) => this.setState({age})}
            value={this.state.age} 
          />
        </View>

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="Home Zip"
            onChangeText={(homezip) => this.setState({homezip})}
            value={this.state.homezip}
            keyboardType="number-pad"
            maxLength={5} 
          />
        </View>

        <View style={styles.center}>
          <TextInput 
            style={styles.txtInput} 
            placeholder="Work Zip"
            onChangeText={(workzip) => this.setState({workzip})}
            value={this.state.workzip} 
            keyboardType="number-pad"
            maxLength={5} 
          />
        </View>

        <Button
          onPress={this.buttonClicked.bind(this)}
          textStyle={{fontSize: 17}}
          style={styles.subButton}
        >
        {"Submit"}
        </Button>

        </ScrollView>
        <OptionList overlayStyles={{backgroundColor:'#fff'}} ref="OPTIONLIST"/>
      </View>

    );
  }
}
        //<TouchableNativeFeedback onPress={this.buttonClicked.bind(this)} >
          //<View style={{width: 200, height: 50, backgroundColor: 'lightblue'}}>
            //<Text>Submit</Text>
          //</View>
       // </TouchableNativeFeedback>

export default CreateEvent;