import React, { Component } from "react";
import PropTypes from "prop-types";

import { TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";

class GoLiveButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    isRed: PropTypes.bool
  };

  render() {
    const buttonStyles = [styles.button, this.props.isRed ? styles.red : null];

    return (
      <TouchableOpacity onPress={this.props.onPress} style={buttonStyles}>
        <Icon style={styles.icon} name="videocam" />

        <Text style={styles.text}>
          {this.props.isRed ? "Go Live" : "Start a Broadcast"}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    borderBottomColor: "#16a085",
    borderBottomWidth: 1,
    borderTopColor: "#16a085",
    borderTopWidth: 1,

    backgroundColor: "#1abc9c",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  red: {
    backgroundColor: "#e74c3c",
    borderTopColor: "#c0392b",
    borderBottomColor: "#c0392b"
  },

  icon: {
    color: "#fff"
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 15,
    paddingBottom: 3
  }
};

export default GoLiveButton;
