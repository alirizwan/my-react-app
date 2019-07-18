import React, { Component } from "react";
import PropTypes from "prop-types";

import { TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";

class ChooseProductButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    isRed: PropTypes.bool
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Icon style={styles.icon} name="photos" />
        <Text style={styles.text}>
         Choose Video
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
    padding: 10,
    marginBottom: 54
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

export default ChooseProductButton;
