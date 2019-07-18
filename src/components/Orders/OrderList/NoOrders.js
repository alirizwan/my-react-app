import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class NoOrders extends Component {
  static propTypes = {
    onStartVideo: PropTypes.func
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.header}>Uh oh!</Text>

          <Text style={styles.details}>
            You don’t have any orders for this product yet. Try starting a
            broadcast to get some!
          </Text>
        </View>

        <TouchableOpacity
          onPress={this.props.onStartVideo}
          style={styles.button}
        >
          <Icon style={styles.icon} name="videocam" />

          <Text style={styles.buttonLabel}>Start a Broadcast</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 20,

    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#333",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#fff"
  },

  text: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 60,
    marginBottom: 60
  },

  header: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20
  },

  details: {
    fontSize: 16,
    textAlign: "center",
    width: 220,
    color: "#525252"
  },

  button: {
    borderTopWidth: 1,
    borderTopColor: "#16a085",

    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,

    padding: 10,

    backgroundColor: "#1ABC9C",

    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonLabel: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 15,
    paddingBottom: 3
  },

  icon: {
    color: "#fff"
  }
};

export default NoOrders;
