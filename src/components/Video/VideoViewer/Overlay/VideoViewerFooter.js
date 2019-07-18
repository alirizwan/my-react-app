import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { Icon, View } from "native-base";

class VideoViewerFooter extends Component {
  static propTypes = {
    isPaused: PropTypes.bool,
    onPausePressed: PropTypes.func,
    onCommentPressed: PropTypes.func
  };

  getIcon = () => {
    return this.props.isPaused
      ? <Icon
          name="play"
          style={styles.icon}
        />
      : <Icon
          name="pause"
          style={styles.icon}
        />;
  };

  render() {
    return(
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={this.props.onPausePressed}
          style={styles.button}
        >
          {this.getIcon()}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={this.props.onCommentPressed}
        >
          <Icon name="text" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  footer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 80,
    height: 75,
    width: '100%',
    alignItems: 'center',
    zIndex: 3
  },

  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  icon: {
    color: 'white',
    backgroundColor: 'transparent'
  },

  commentButton: {
    right: 25,
    position: 'absolute'
  }
};

export default VideoViewerFooter;
