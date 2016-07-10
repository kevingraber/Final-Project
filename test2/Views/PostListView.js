import React, {
  ListView,
  RefreshControl,
  View,
  Text
} from 'react-native';

import Actions from 'Social/Actions';
import DataStore from 'Social/DataStore';
import PostListItem from 'Social/Views/PostListItem';
import StyleVars from 'Social/StyleVars';

export default class PostListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      refreshing: false,
      loaded: false
    };
  }

  fetchData() {
    var REQUEST_URL = 'http://ec2-52-90-83-128.compute-1.amazonaws.com/events';
    
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
          });
        })
        .done();
  }

  renderLoadingView() {
    return (
        <View style={{ backgroundColor: StyleVars.Colors.lightBackground }}>
          <Text>
            Loading ...
          </Text>
        </View>
    );
  }
  
  componentDidMount() {
    // this.stopPostListener = DataStore.listen(this.onListChange.bind(this));
    // Actions.loadPosts();
    this.fetchData();
  }

  componentWillUnmount() {
    this.stopPostListener();
  }

  onListChange(items) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      refreshing: false,
    });
  }

  render() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
      <ListView
        style={{ backgroundColor: StyleVars.Colors.lightBackground }}
        dataSource={this.state.dataSource}
        renderRow={(row) => <PostListItem post={row} />}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor={StyleVars.Colors.darkBackground}
            colors={StyleVars.Colors.darkBackground}
          />
        }
      />
        
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    Actions.loadPosts();
  }
}
