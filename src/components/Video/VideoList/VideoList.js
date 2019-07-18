import React, { Component } from "react";
import PropTypes from "prop-types";

import { ScrollView, RefreshControl } from "react-native";
import { List } from "native-base";

import VideoListItem from "./VideoListItem";


class VideoList extends Component {
  static propTypes = {
    isRefreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onItemPress: PropTypes.func,
    onItemLongPress: PropTypes.func,
    videos: PropTypes.array.isRequired,
    style: PropTypes.object,
    itemStyle: PropTypes.object
  };

  getRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
      />
    );
  };

  getVideoListItem = videos => {
    return (
      <VideoListItem
        key={videos.id}
        name={videos.name}
        description={videos.description}
        image={`http://kahn.cmp.co:8086/thumbnail?application=live&streamname=${videos.wowzaId}&format=png&size=720x405`}
        wowzaKey={videos.wowzaId}
        onPress={_ => this.props.onItemPress(videos)}
        onLongPress={_ => this.props.onItemLongPress(videos)}
        style={this.props.itemStyle}
      />
    );
  };

  render() {

    return (
      <ScrollView
        style={Object.assign({}, styles.container, this.props.style)}
        refreshControl={this.getRefreshControl()}
      >
        <List>
          {this.props.videos.map(this.getVideoListItem)}
        </List>
      </ScrollView>

    );
  }
}

const styles = {
  container: {
    padding: 15,
    paddingTop: 15
  }
};

export default VideoList;
