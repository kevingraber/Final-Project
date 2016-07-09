'use strict';
import React, {
  StyleSheet,
  Text,
  TabBarIOS,
  ScrollView,
  View
} from 'react-native';

import Actions from 'Social/Actions';
import Button from 'Social/Views/Button';
import DataStore from 'Social/DataStore';
import LoadingView from 'Social/Views/LoadingView';
import PostListView from 'Social/Views/PostListView';
import Routes from 'Social/Routes';
import SharedStyles from 'Social/SharedStyles';
import StyleVars from 'Social/StyleVars';

import TabBar from './TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Search from './Search';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 96,
    alignItems: "center"
  },
  reloadText: {
    textAlign: "center",
    marginVertical: 20
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  button: { width: 256 }
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      failed: false
    };
  }

  componentWillMount() {
    Actions.auth();
  }

  componentDidMount() {
    Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
    Actions.logout.listen(this._onLogout.bind(this));
  }

  render() {
    if (this.state.failed) {
      return (
        <View style={[SharedStyles.screenContainer, styles.buttonContainer]}>
          <Text style={[SharedStyles.headingText, styles.reloadText]}>
            Could not fetch posts.
          </Text>
          <Button onPress={() => this._retryFetch()} style={styles.button}>
            Retry Now
          </Button>
        </View>
      );
    } else if (this.state.loaded) {
      return (

        <ScrollableTabView
          style={{marginTop: 5, }}
          tabBarPosition="bottom"
          initialPage={2}
          renderTabBar={() => <TabBar />}
          >
          <ScrollView tabLabel="near-me" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Events Near ME!!</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="search" style={styles.tabView}>
            <View>
              <Search />
            </View>
          </ScrollView>
          <ScrollView tabLabel="home" style={styles.tabView}>
            <View>
              <PostListView style={SharedStyles.screenContainer} />
            </View>
          </ScrollView>
          <ScrollView tabLabel="forward" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Idk bro...</Text>
            </View>
          </ScrollView>
          <ScrollView tabLabel="account-circle" style={styles.tabView}>
            <View style={styles.card}>
              <Text>Edit dat profile</Text>
            </View>
          </ScrollView>
        </ScrollableTabView>

        );
    } else {
      return (
        <LoadingView backgroundColor={StyleVars.Colors.mediumBackground}>
          Loading...
        </LoadingView>
      );
    }
  }

  _retryFetch() {
    // TODO: Initiate another fetch from the server
  }

  _onLoadUserCompleted(user) {
    let currentUser = DataStore.getCurrentUser();

    if (currentUser.onboarded) {
      this.setState({ loaded: true });
    } else {
      this.props.replaceRoute(Routes.onboarding(currentUser));
    }
  }

  _onLogout() {
    this.props.replaceRoute(Routes.login());
  }
}
