import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";

class AdditionalOptionsBar extends Component {
  static propTypes = {
    onChangePassword: PropTypes.func,
    onChangeEmail: PropTypes.func,
    isEditting: PropTypes.bool
  };

  getActionButtons() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.onChangePassword}
          style={styles.button}
        >
          <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.props.onChangeEmail}
          style={[styles.button, styles.last]}
        >
          <Text style={styles.text}>Change Email</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.props.isEditting && this.getActionButtons()}
      </View>
    );
  }
}

const styles = {
  container: {
    borderTopWidth: 1,
    borderTopColor: "#7f8c8d",
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
