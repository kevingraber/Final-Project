import React, {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  MapView
} from 'react-native';
import RNGeocoder from 'react-native-geocoder';
import moment from 'moment';
import StyleVars from 'Social/StyleVars';

let imageWidth = (Dimensions.get('window').width * 1/2) - 10;

const styles = StyleSheet.create({
  postContainer: {
    paddingVertical: 10,
    backgroundColor: StyleVars.Colors.lightBackground,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },

  postPicture: {
    width: imageWidth,
    height: 100
  },

  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: StyleVars.Fonts.general,
    color: StyleVars.Colors.primary,
    marginHorizontal: 10,
    marginBottom: 5
  },
  lowerText: {
    fontSize: 12,
    fontFamily: StyleVars.Fonts.general,
    color: StyleVars.Colors.primary,
    marginHorizontal: 10,
    marginVertical: 5
  },
  map: {
    height: 100,
    width: imageWidth
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  horizontal2: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});

export default class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { geolocation: null };
  }

  componentDidMount() {
    // if (this.props.post.position) {
    //   let position = JSON.parse(this.props.post.position);
    //   RNGeocoder.reverseGeocodeLocation(position.coords, (err, data) => {
    //     if (err) { return; }
    //     this.setState({ geolocation: data[0] });
    //   });
    // }
  }

  render() {
    var date = moment(this.props.post.date_time,moment.ISO_8601).format("MM-DD-YY");

    var region ={
      latitude: this.props.post.loc[0],
      longitude:this.props.post.loc[1],
      latitudeDelta: 0.009,
      longitudeDelta: 0.027
    };

    var annotation = [{
      longitude: this.props.post.loc[1],
      latitude: this.props.post.loc[0]
    }];

    return (
      <View style={styles.postContainer}>
        <View style={styles.horizontal}>
          <MapView
              style={styles.map}
              region={region}
              showsUserLocation={false}
              annotations={annotation}
              scrollEnabled = {false}
          />
          <Image
              source={{uri: this.props.post.image, isStatic: true}}
              style={styles.postPicture}
              resizeMode="cover"
          />
        </View>
        <View style={styles.horizontal2}>
          <Text style={styles.eventName}>
            {this.props.post.name}
          </Text>
          <Text style={styles.lowerText} >
            {date}
          </Text>
        </View>
        <Text style={styles.lowerText}>
          {this.props.post.location_name}
        </Text>
        <Text style={styles.lowerText}>
          {this.props.post.description}
        </Text>

      </View>
    );
  }
}
