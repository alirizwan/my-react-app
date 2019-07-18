import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Button, Icon } from "native-base";

import LiveIndicator from "./LiveIndicator";
import RecordButton from "./RecordButton";

class BottomControls extends Component {
  static propTypes = {
    isBroadcasting: PropTypes.bool.isRequired,
    isCameraReversed: PropTypes.bool.isRequired,

    onRecordPress: PropTypes.func,
    onReverseCameraPress: PropTypes.func
  };

  render() {
    return (
      <View style={styles.container}>
        <LiveIndicator isBroadcasting={this.props.isBroadcasting} />

        <RecordButton
          isBroadcasting={this.props.isBroadcasting}
          onPress={this.props.onRecordPress}
        />

        <Button
          onPress={this.props.onReverseCameraPress}
          style={styles.reverseCamera}
          transparent
        >
          <Icon style={styles.icon} name="reverse-camera" />
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 25,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  icon: {
    color: "#fff",
    fontSize: 30,
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  reverseCamera: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25
  }
};

export default BottomControls;
