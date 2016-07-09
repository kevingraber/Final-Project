'use strict';
import React, {
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  View
} from 'react-native';

import Actions from 'Social/Actions';
import Routes from 'Social/Routes';
import StyleVars from 'Social/StyleVars';

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: "center"
  },
  firstNameContainer: {
    width: Dimensions.get("window").width - 150,
    flexDirection: "column",
    marginTop: 10,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  lastNameContainer: {
    width: Dimensions.get("window").width - 150,
    marginTop: 10,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  emailContainer: {
    width: Dimensions.get("window").width - 40,
    marginLeft: 20,
    marginTop: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  homeZipContainer: {
    width: Dimensions.get("window").width - 200,
    marginLeft: 5,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  workZipContainer: {
    width: Dimensions.get("window").width - 200,
    marginTop: -40,
    marginLeft: 195,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  bioContainer: {
    width: Dimensions.get("window").width - 40,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    borderColor: StyleVars.Colors.darkBackground,
    borderWidth: 1
  },
  inputContainerPic: {
    width: Dimensions.get("window").width ,
    alignItems: "center",
    // flexDirection: "row",
    marginTop: 20
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
    flex: 1,
    height: 100,
    backgroundColor: "white",
    color: StyleVars.Colors.primary,
    fontFamily: StyleVars.Fonts.general,
    fontSize: 16,
    padding: 5
  },
  profilePictureContainer: {
    flex: 1,
    justifyContent: "center"
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

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      homezip: this.props.user.homezip,
      workzip: this.props.user.wokrzip,
      bio: this.props.user.bio,
      name: this.props.user.name,
      profilePicture: this.props.user.profilePicture,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }
  }

  onDateChange(date2) {
    this.setState({date: date2});
  }

  componentWillMount() {
    Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
    Actions.onboard.completed.listen(this.onOnboardCompleted.bind(this));
  }

  render() {
    return (

      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.inputContainerPic}>
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={() => this.onPressProfilePicture()}
            >
              <Image
                source={this.state.profilePicture}
                style={styles.profilePicture}
              />
            </TouchableOpacity>

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
            />
          </View>

          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
          />

          <View style={styles.homeZipContainer}>
            <TextInput
              style={styles.input}
              value={this.state.homezip}
              placeholder="Home Zip"
              autoFocus={true}
              onChangeText={(homezip) => this.setState({ homezip: homezip })}
              returnKeyType="done"
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
            />
          </View>

          <View style={styles.bioContainer}>
            <TextInput
              style={styles.input2}
              value={this.state.bio}
              placeholder="bio"
              autoFocus={true}
              onChangeText={(bio) => this.setState({ bio: bio })}
              returnKeyType="done"
              multiline={true}
            />
          </View>

        </ScrollView>
      </View>
    );
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

export default Onboarding;
