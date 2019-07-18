import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Button, Icon } from "native-base";

class TopControls extends Component {
  static propTypes = {
    onMutePress: PropTypes.func,
    onFlashPress: PropTypes.func,
    onSharePress: PropTypes.func,
    isMuted: PropTypes.bool.isRequired,
    isFlashOn: PropTypes.bool.isRequired,
    isBroadcasting: PropTypes.bool.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <MuteButton
          isMuted={this.props.isMuted}
          onPress={this.props.onMutePress}
        />

        <FlashButton
          isFlashOn={this.props.isFlashOn}
          onPress={this.props.onFlashPress}
        />

        <ShareButton
          isBroadcasting={this.props.isBroadcasting}
          onPress={this.props.onSharePress}
        />
      </View>
    );
  }
}

const MuteButton = ({ isMuted, onPress }) =>
  <Button onPress={onPress} transparent>
    <Icon
      style={isMuted ? styles.redIcon : styles.icon}
      name={isMuted ? "mic-off" : "mic"}
    />
  </Button>;

const FlashButton = ({ isFlashOn, onPress }) =>
  <Button onPress={onPress} transparent>
    <Icon
      style={isFlashOn ? styles.icon : styles.transparentIcon}
      name="flash"
    />
  </Button>;

const ShareButton = ({ isBroadcasting, onPress }) =>
  isBroadcasting &&
  <Button onPress={onPress} transparent>
    <Icon style={styles.icon} name="share" />
  </Button>;

const styles = {
  hidden: {
    opacity: 0
  },

  visible: {
    opacity: 1
  },

  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,

    flexDirection: "row",
    justifyContent: "space-between"
  },

  icon: {
    color: "#fff",
    fontSize: 25,
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  redIcon: {
    color: "#E74C3C",
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  transparentIcon: {
    color: "rgba(255, 255, 255, 0.3)",
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
};

export default TopControls;
