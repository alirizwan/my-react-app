import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

class RecordButton extends Component {
  static propTypes = {
    isBroadcasting: PropTypes.bool.isRequired,
    onPress: PropTypes.func
  };

  render() {
    const buttonStyles = [
      styles.button,
      this.props.isBroadcasting ? styles.buttonRecording : null
    ];

    const dotStyles = [
      styles.dot,
      this.props.isBroadcasting ? styles.dotRecording : null
    ];

    return (
      <View style={buttonStyles}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={dotStyles} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  button: {
    width: 64,
    height: 64,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    padding: 3,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonRecording: {
    borderColor: "rgba(231, 76, 60, 0.8)"
  },

  dot: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 100
  },

  dotRecording: {
    backgroundColor: "rgba(231, 76, 60, 0.8)"
  }
};

export default RecordButton;
