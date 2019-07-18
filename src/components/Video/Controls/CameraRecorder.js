import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import WowzaGoCoder from "react-native-wowza-gocoder";
import {
  REACT_APP_GOCODER_SDK_IOS,
  REACT_APP_GOCODER_SDK_ANDROID
} from "react-native-dotenv";

class CameraRecorder extends Component {
  static propTypes = {
    isMuted: PropTypes.bool.isRequired,
    isFlashOn: PropTypes.bool.isRequired,
    isCameraReversed: PropTypes.bool.isRequired,
    isBroadcasting: PropTypes.bool.isRequired,
    wowzaId: PropTypes.string.isRequired
  };

  getGoCoderLicenseKey = () => {
    return Platform.OS === "ios"
      ? REACT_APP_GOCODER_SDK_IOS
      : REACT_APP_GOCODER_SDK_ANDROID;
  };

  render() {
    return (
      <WowzaGoCoder
        muted={this.props.isMuted}
        flashOn={this.props.isFlashOn}
        frontCamera={this.props.isCameraReversed}
        broadcasting={this.props.isBroadcasting}
        broadcastName={this.props.wowzaId}
        hostAddress="kahn.cmp.co"
        port={1935}
        applicationName="live"
        username=""
        password=""
        sdkLicenseKey={this.getGoCoderLicenseKey()}
        style={styles.gocoder}
        sizePreset={3}
      />
    );
  }
}

const styles = {
  gocoder: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black"
  }
};

export default CameraRecorder;
