import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

class VideoName extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  render() {
    return (
      <TextInput
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Give your broadcast a name"
        placeholderTextColor="#fff"
        style={styles.input}
        multiline
      />
    );
  }
}

const styles = {
  input: {
    margin: 20,
    height: 170,

    fontSize: 40,
    fontWeight: "800",
    color: "#fff",

    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0
  }
};

export default VideoName;
