import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";

class BottomActionButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
  };

  render() {
    const buttonStyles = [
      styles.button,
      this.props.disabled ? styles.disabled : null
    ];

    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        style={buttonStyles}
      >
        <Text style={styles.text}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    alignItems: "center",
    alignSelf: "stretch",
    padding: 20,

    backgroundColor: "#1abc9c",
    borderTopColor: "#16a085",
    borderBottomColor: "#16a085",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  },

  disabled: {
    backgroundColor: "#bdc3c7",
    borderTopColor: "#7f8c8d",
    borderBottomColor: "#7f8c8d"
  }
};

export default BottomActionButton;
