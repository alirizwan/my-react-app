import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class NoOpportunities extends Component {
  static propTypes = {
    onAddOpportunity: PropTypes.func
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.header}>
            Partner with Influencers on cmp
          </Text>

          <Text style={styles.details}>
            Create an opportunity for your product and let influencers
            find and sell your product for you.
          </Text>
        </View>

        <TouchableOpacity
          onPress={this.props.onAddOpportunity}
          style={styles.button}
        >
          <Icon style={styles.icon} name="videocam" />

          <Text style={styles.buttonLabel}>Create an Opportunity</Text>
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
    width: 250,
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

export default NoOpportunities;
