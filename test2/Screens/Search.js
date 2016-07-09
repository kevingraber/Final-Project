'use strict';
import React, {
  Component,
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
  View
} from 'react-native';

import StyleVars from 'Social/StyleVars';
import Button from 'Social/Views/Button';
import DatePicker from 'react-native-datepicker';
// import DropDown from 'react-native-dropdown';
import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-dropdown';

const Item = Picker.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    width: Dimensions.get("window").width - 40,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  startTimeContainer: {
    width: 150,
    marginLeft: 20,
  },
  endTimeContainer: {
    width: 120,
    marginTop: -55,
    marginLeft: 210,
  },
  distPicker: {
    width: 100,
  },
  pickerTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dropDown: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  dropDown1: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  zipcodeContainer: {
    width: Dimensions.get("window").width - 200,
    marginTop: -40,
    marginLeft: 195,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  searchButton: {
    width: Dimensions.get("window").width - 200,
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

  componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['SELECT2']);
    updatePosition(this.refs['OPTIONLIST']);
  }

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
        <ScrollView
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}
        >

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={this.state.search}
              placeholder="Search"
              autoFocus={true}
              onChangeText={(search) => this.setState({ search: search })}
              returnKeyType="done"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.startTimeContainer}>
            <Text style={{textAlign: "center", marginRight: 30}}> Start Time </Text>
            <DatePicker
              style={{width: 150}}
              date={this.state.start}
              mode="time"
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(start) => {this.setState({start: start});}}
              iconSource={require('./../time.png')}
              customStyles={{
                dateIcon: {
                  position: 'relative',
                  left: 25,
                  marginLeft: 0
                }}}
            />
          </View>

          <View style={styles.endTimeContainer}>
          <Text style={{textAlign: "center"}}> End Time </Text>
            <DatePicker
              style={{width: 125}}
              date={this.state.end}
              mode="time"
              format="h:mm a"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(end) => {this.setState({end: end});}}
              showIcon={false}
            />
          </View>

          <View style={styles.dropDown1}>

            <Select
              width={150}
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
          
          <View style={styles.dropDown}>
            <Select
              width={250}
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

          <OptionList ref="OPTIONLIST"/>

          <Button
            // onPress={() => this.submitForm()}
            textStyle={{fontSize: 17}}
            style={styles.searchButton}
          >
          {"Search"}
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


  
}

export default Search;
