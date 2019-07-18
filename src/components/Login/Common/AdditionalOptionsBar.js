import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";

class AdditionalOptionsBar extends Component {
  static propTypes = {
    onCreateAccount: PropTypes.func,
    onForgotPassword: PropTypes.func
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.onCreateAccount}
          style={styles.button}
        >
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.onForgotPassword}
          style={[styles.button, styles.last]}
        >
          <Text style={styles.text}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: "row"
  },

  button: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    padding: 20,

    backgroundColor: "#fff",
    borderRightColor: "#7f8c8d",
    borderRightWidth: 1
  },

  last: {
    borderRightWidth: 0
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1abc9c"
  }
};

export default AdditionalOptionsBar;
