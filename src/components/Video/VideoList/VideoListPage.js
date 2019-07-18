import React, { Component } from "react";
import { Container } from "native-base";

import { compose, graphql } from "react-apollo";
import { getVideos } from "./queries";
import { Platform, ActionSheetIOS, Alert } from "react-native";
import VideoList from "./VideoList";
import VideoListHeader from "./VideoListHeader";

import { connect } from "react-redux";
import { toggleVisible, setVideo, setProduct, setOpportunity } from "@cmp/redux/actions/videoViewer";
import decodeJWT from "jwt-decode";
import { AsyncStorage } from "react-native";
import { deleteVideoById} from "../mutations";

class VideoListPage extends Component {
  static navigationOptions = {
    title: "Videos"
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onItemPress = (video) => {
    const extractedVideo = {
      url: video.url,
      id: video.id
    };

    this.props.onSetVideo(extractedVideo);
    this.props.onSetProduct(video.product);
    if(video.opportunity) {
      this.props.onSetOpportunity(video.opportunity);
    }
    this.props.onShowVideo();
  };

  onItemLongPress = (video) => {
    this.onDelete(video);
  };

  onDelete = (video) => {
    const title = `Delete ${video.name}?`;
    const message = `Are you sure you want to delete ${video.name}? This action cannot be undone.`;
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Delete", "Cancel"],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: title,
          message: message
        },
        (buttonIndex) => {
          if (buttonIndex === undefined || buttonIndex === 0) {
            this.onVideoDelete(video);
          }
        });
    } else {
      Alert.alert(title, message, [
        { text: "Cancel" },
        { text: "Delete", onPress: this.onConfirm }
      ]);
    }
  };

  onVideoDelete = async (video) => {
    await this.props.deleteVideo({
      variables: {
        id: video.id
      }
    });

  };

  render() {
    const { videos, networkStatus, refetch } = this.props.data;

    return (
      <Container>

        <VideoListHeader
          title={`Videos`}
          onBack={this.onDismiss}
        />

        <VideoList
          videos={videos || []}
          isRefreshing={networkStatus === 4}
          onRefresh={refetch}
          onItemPress={this.onItemPress}
          onItemLongPress={this.onItemLongPress}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state.videoViewer,
      id: state.account.id
    }
};

const mapActionsToProps = dispatch => ({
  onShowVideo: _ => dispatch(toggleVisible()),

  onSetVideo: video => dispatch(setVideo(video)),
  onSetProduct: product => dispatch(setProduct(product)),
  onSetOpportunity: opportunity => dispatch(setOpportunity(opportunity))
});

export default compose(
    connect(mapStateToProps, mapActionsToProps),
    graphql(
      getVideos, {
        options: (props) => {
          return {variables: {owner: props.id}};
        }
      }),

  graphql(deleteVideoById, {

    options: props => ({
      refetchQueries: [
        {
          query: getVideos,
          variables: { id: props.id}
        }
      ]
    }),
    name: "deleteVideo"
  }),

)(VideoListPage);
