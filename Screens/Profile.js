'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerIOS,
  StatusBar,
  Platform,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
// import Actions from './../Actions';
// import Routes from './../Routes';
import StyleVars from './StyleVars';
import Button from './Button';
import DatePicker from 'react-native-datepicker';
import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-dropdown';
import Tabs from 'react-native-tabs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: 'white',
    flex: 1
  },
  firstNameContainer: {
    width: windowWidth*.7,
    flexDirection: "column",
    marginTop: 10,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  lastNameContainer: {
    width: windowWidth*.7,
    marginTop: 10,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  emailContainer: {
    width: windowWidth*.9,
    marginLeft: 20,
    marginTop: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  dateContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  homeZipContainer: {
    width: windowWidth*.3,
    marginLeft: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  workZipContainer: {
    width: windowWidth*.3,
    marginTop: -40,
    marginLeft: (((windowWidth*.3)*2) + 20),
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  bioContainer: {
    width: windowWidth*.9,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    borderColor: StyleVars.Colors.darkBackground,
    borderWidth: 1
  },
  inputContainerPic: {
    width: windowWidth ,
    alignItems: "center",
    // flexDirection: "row",
    marginTop: 20
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#c0cac9',
    fontFamily: 'Roboto',
    fontWeight: '100',
    justifyContent: 'center',
    textAlign: 'center',
    opacity: .7,
    fontSize: 16,
    padding: 5
  },
  input2: {
    flex: 1,
    height: 100,
    backgroundColor: '#c0cac9',
    fontFamily: 'Roboto',
    fontWeight: '100',
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 16,
    padding: 5
  },
  profilePictureContainer: {
    flex: 1,
    justifyContent: "center"
  },
  saveButton: {
    width: windowWidth*.5,
    marginTop: 20,
    marginLeft: windowWidth*.25,
    paddingVertical: 12
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: StyleVars.Colors.mediumBackground
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstname: this.props.user.firstname,
      // lastname: this.props.user.lastname,
      // email: this.props.user.email,
      // homezip: this.props.user.homezip,
      // workzip: this.props.user.wokrzip,
      // bio: this.props.user.bio,
      // name: this.props.user.name,
      // profilePicture: this.props.user.profilePicture,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
  }

  onDateChange(date2) {
    this.setState({date: date2});
  }

  componentWillMount() {
    // Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
    // Actions.onboard.completed.listen(this.onOnboardCompleted.bind(this));
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
          <View style={styles.inputContainerPic}>
{/*            <TouchableHighlight
              style={styles.profilePictureContainer}
              onPress={() => this.onPressProfilePicture()}
            >
              <Image
                source={this.state.profilePicture}
                style={styles.profilePicture}
              />
            </TouchableHighlight>*/}

          <View style={styles.firstNameContainer}>
            <TextInput
              style={styles.input}
              value={this.state.firstname}
              placeholder="First Name"
              autoFocus={true}
              onChangeText={(firstname) => this.setState({ firstname: firstname })}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          <View style={styles.lastNameContainer}>
            <TextInput
              style={styles.input}
              value={this.state.lastname}
              placeholder="Last Name"
              autoFocus={true}
              onChangeText={(lastname) => this.setState({ lastname: lastname })}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          </View>

          <View style={styles.emailContainer}>
            <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="Email"
              autoFocus={true}
              onChangeText={(email) => this.setState({ email: email })}
              returnKeyType="done"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.dateContainer}>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              format="MMMM Do, YYYY"
              minDate="January 1st, 1920"
              maxDate="December 31st, 2015"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => {this.setState({date: date});}}
            />
          </View>

          <View style={styles.homeZipContainer}>
            <TextInput
              style={styles.input}
              value={this.state.homezip}
              placeholder="Home Zip"
              autoFocus={true}
              onChangeText={(homezip) => this.setState({ homezip: homezip })}
              returnKeyType="done"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={styles.workZipContainer}>
            <TextInput
              style={styles.input}
              value={this.state.workzip}
              placeholder="Work Zip"
              autoFocus={true}
              onChangeText={(workzip) => this.setState({ workzip: workzip })}
              returnKeyType="done"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={styles.bioContainer}>
            <TextInput
              style={styles.input2}
              value={this.state.bio}
              placeholder="Bio"
              autoFocus={true}
              onChangeText={(bio) => this.setState({ bio: bio })}
              returnKeyType="done"
              multiline={true}
            />
          </View>

          <Button
            // onPress={() => this.submitForm()}
            textStyle={{fontSize: 17}}
            style={styles.saveButton}
          >
          {"Save"}
          </Button>

        </ScrollView>
      </View>
    );
  }

  onValueChange(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  onPressProfilePicture() {
    NativeModules.ImagePickerManager.showImagePicker({
      title: "Set Profile Picture"
    }, (picture) => {
      if (picture.data) {
        this.setState({
          profilePicture: {
            uri: 'data:image/jpeg;base64,' + picture.data, isStatic: true
          }
        });
      }
    });
  }

  onOnboardStarted() {
    Actions.onboard({
      onboarded: true,
      // firstname: this.state.firstname,
      // lastname: this.state.lastname,
      // email: this.state.email,
      homezip: this.state.homezip,
      // workzip: this.state.wokrzip,
      // bio: this.state.bio,
      name: this.state.bio,
      profilePicture: this.state.profilePicture
    });
  }

  onOnboardCompleted() {
    this.props.replaceRoute(Routes.contacts(this.props.user));
  }

}

export default Profile;
