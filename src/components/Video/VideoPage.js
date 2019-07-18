import React, { Component } from "react";
import { Container, Icon } from "native-base";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import ImagePicker from "react-native-image-picker";
import * as Progress from "react-native-progress";
import {
  createVideo,
  updateVideo,
  associateVideoToProduct
} from "./mutations";

import {
  toggleMuted,
  toggleFlash,
  toggleCameraReversed,
  startBroadcasting,
  stopBroadcasting,
  setVideo,
  shareVideo,
  showChooseProduct,
  hideChooseProduct,
  setProduct,
  setName,
  uploadVideo
} from "@cmp/redux/actions/video";

import ChooseProductModal from "../Products/ChooseProduct/ChooseProductModal";
import CameraRecorder from "./Controls/CameraRecorder";
import TopControls from "./Controls/TopControls";
import BottomControls from "./Controls/BottomControls";
import ActiveProduct from "./Controls/ActiveProduct";
import VideoName from "./Controls/VideoName";
import GoLiveButton from "../Common/GoLiveButton";
import ChooseVideoButton from "./Controls/ChooseVideoButton";

class VideoPage extends Component {

  createNewVideo = (videoType = "Live") => {
    if(this.props.opportunity && this.props.product.owner.id != this.props.user) {
      return this.props.createVideo({
        variables: {
          video: {
            name: this.props.name,
            description: "",
            summary: "",
            live: true,
            wowzaId: this.props.wowzaId,
            type: videoType,
            product: this.props.product.id,
            opportunity: this.props.opportunity.id
          }
        }
      });
    }
    else if(this.props.product){
      return this.props.createVideo({
        variables: {
          video: {
            name: this.props.name,
            description: "",
            summary: "",
            live: true,
            wowzaId: this.props.wowzaId,
            type: videoType,
            product: this.props.product.id
          }
        }
      });
    }
    else {
      return this.props.createVideo({
        variables: {
          video: {
            name: this.props.name,
            description: "",
            summary: "",
            live: true,
            wowzaId: this.props.wowzaId,
            type: videoType
          }
        }
      });
    }

  };

  stopCurrentVideo = () => {
    return this.props.updateVideo({
      variables: {
        id: this.props.video.id,
        video: {
          live: false
        }
      }
    });
  };

  onRecord = async () => {
    if (!this.props.isUploading) {
        const token = await AsyncStorage.getItem("@cmp:id_token");
        if (!token) {
          this.props.navigation.navigate("Login");
        } else {
          if (this.props.isBroadcasting) {
            this.stopCurrentVideo().then(this.props.onStopRecording);
          }
          else {
            this.createNewVideo().then(result =>
              this.props.onCreateVideo(result.data.createVideo)
            );
            this.props.onStartRecording();
          }
        }
    }
  };

  onChooseProduct = product => {
    if (this.props.isBroadcasting) this.associateProduct(product);
    this.props.onChooseProduct(product);
  };

  onChooseVideo = product => {
      if (!this.props.isUploading){// && this.props.product.id) {
          this.createNewVideo("Upload").then(result => {

              const options = {
                title: "Select Video",
                mediaType: "video",
                takePhotoButtonTitle: null,
                storageOptions: { skipBackup: true, path: "videos" }
              };

              ImagePicker.showImagePicker(options, response => {
                if (response.error) {
                  this.props.onVideoError(response.error);
                } else if (!response.didCancel) {
                  this.props.onVideoUpload(response.uri, this.props.wowzaId);
                }
              });

          });
      }
  };

  getTopControls = () => {
    return (
      !this.props.prevideo &&
      <TopControls
        isMuted={this.props.isMuted}
        isFlashOn={this.props.isFlashOn}
        isBroadcasting={this.props.isBroadcasting}
        onFlashPress={this.props.onFlashPress}
        onMutePress={this.props.onMutePress}
        onSharePress={this.props.onSharePress}
      />
    );
  };

  getBottomControls = () => {
    return (
      !this.props.prevideo &&
      <BottomControls
        isBroadcasting={this.props.isBroadcasting}
        isCameraReversed={this.props.isCameraReversed}
        onRecordPress={this.onRecord}
        onReverseCameraPress={this.props.onReverseCameraPress}
      />
    );
  };

  getVideoName = () => {
    return (
      this.props.prevideo &&
      <VideoName
        value={this.props.name}
        onChange={this.props.onNameChange}
      />
    );
  };

  getGoLiveButton = () => {
    return (
      this.props.prevideo &&
      <View style={styles.dockedToBottom}>
        <GoLiveButton onPress={this.onRecord} isRed />
      </View>
    );
  };

  getChooseVideoButton = () => {
    return (
      this.props.prevideo &&
      <View style={styles.dockedToBottom}>
        <ChooseVideoButton onPress={this.onChooseVideo}/>
      </View>
    );
  };

  getProgressBar = () => {
    return (
        this.props.isUploading &&
      <Progress.Bar progress={this.props.uploadProgress} width={200} style={{ marginLeft: '25%' }} />
    );
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={styles.container}>
          <ChooseProductModal
            isVisible={this.props.isChooseProductVisible}
            onSubmit={this.onChooseProduct}
            onDismiss={this.props.onDismissChooseProduct}
          />

          <CameraRecorder
            isMuted={this.props.isMuted}
            isFlashOn={this.props.isFlashOn}
            isCameraReversed={this.props.isCameraReversed}
            isBroadcasting={this.props.isBroadcasting}
            wowzaId={this.props.wowzaId}
            style={styles.camera}
          />

          <ActiveProduct
            product={this.props.product}
            onPress={this.props.onChangeProductPress}
          />

          {this.getVideoName()}
          {this.getTopControls()}
          {this.getBottomControls()}
          {this.getGoLiveButton()}
          {this.getProgressBar()}
          {this.getChooseVideoButton()}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "center"
  },

  scrim: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "column",
    justifyContent: "center"
  },

  dockedToBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
};

const mapStateToProps = state => ({
  ...state.video,
  user: state.account.id
});

const mapActionsToProps = dispatch => ({
  onMutePress: _ => dispatch(toggleMuted()),
  onFlashPress: _ => dispatch(toggleFlash()),
  onReverseCameraPress: _ => dispatch(toggleCameraReversed()),
  onStartRecording: _ => dispatch(startBroadcasting()),
  onStopRecording: _ => dispatch(stopBroadcasting()),
  onCreateVideo: video => dispatch(setVideo(video)),
  onSharePress: _ => dispatch(shareVideo()),
  onChangeProductPress: _ => dispatch(showChooseProduct()),
  onDismissChooseProduct: _ => dispatch(hideChooseProduct()),
  onChooseProduct: product => dispatch(setProduct(product)),
  onNameChange: e => dispatch(setName(e.nativeEvent.text)),
  onGoLive: e => dispatch(goLive()),
  onVideoError: error => alert(error),
  onVideoUpload: (e, key) => dispatch(uploadVideo(e, key))
});

export default compose(
  graphql(createVideo, { name: "createVideo" }),
  graphql(updateVideo, { name: "updateVideo" })
)(connect(mapStateToProps, mapActionsToProps)(VideoPage));
