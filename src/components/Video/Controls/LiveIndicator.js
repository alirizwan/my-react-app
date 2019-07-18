import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class LiveIndicator extends Component {
  static propTypes = {
    isBroadcasting: PropTypes.bool.isRequired
  };

  render() {
    const containerStyles = [
      styles.container,
      this.props.isBroadcasting ? styles.live : null
    ];

    return (
      <View style={styles.parent}>
        <View style={containerStyles}>
          {this.props.isBroadcasting && <View style={styles.dot} />}

          <Text style={styles.text}>
            {this.props.isBroadcasting ? "LIVE" : "OFF AIR"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  parent: {
    width: 80
  },

  container: {
    borderRadius: 3,

    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 3,
    paddingBottom: 3,

    backgroundColor: "rgba(255, 255, 255, 0.8)",

    alignItems: "center",
    flexDirection: "row",
    alignSelf: "flex-start",

    opacity: 0.3
  },

  live: {
    backgroundColor: "rgba(231, 76, 60, 0.5)",
    opacity: 1
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 100,
    backgroundColor: "#fff",
    marginRight: 5
  },

  text: {
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
};

export default LiveIndicator;
