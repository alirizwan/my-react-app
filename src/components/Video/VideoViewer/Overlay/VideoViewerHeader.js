import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import { View, Icon } from "native-base";

class VideoViewerHeader extends Component {
  static propTypes = {
    broadcasterImage: PropTypes.string,
    onShare: PropTypes.func,
    onDismiss: PropTypes.func,
    onProfileView: PropTypes.func
  }

  render() {
    return (
      <View style={styles.header}>
        <Image
          source={{uri: this.props.broadcasterImage}}
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onDismiss}
        >
          <Icon
            name='arrow-down'
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.props.onShare}
        >
          <Icon name='share'
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = {
    header: {
      position: 'absolute',
      top: 0,
      zIndex: 3,
      flex: 1,
      width: '100%',
      height: 75,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30
    },

    image: {
      height: 27,
      width: 27,
      backgroundColor: 'white',
    },

    button: {
      backgroundColor: 'transparent'
    },

    icon: {
      color: 'white',
      backgroundColor: 'transparent',
    },
}

export default VideoViewerHeader;
