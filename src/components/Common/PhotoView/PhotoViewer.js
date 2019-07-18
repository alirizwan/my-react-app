import React, { Component } from "react";
import { Share } from "react-native";
import PropTypes from "prop-types";
import PhotoView from "react-native-photo-view";
import PhotoViewerHeader from "./PhotoViewerHeader";
import { Container } from "native-base";

class PhotoViewer extends Component {
  static propTypes = {
    onDismiss: PropTypes.func,

    shareAllowed: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string.isRequired,
    onSharePress: PropTypes.func,
    onPrintPress: PropTypes.func
  };

  render() {
    return (
      <Container style={styles.container}>
        <PhotoViewerHeader
          onBack={this.props.onDismiss}
          shareAllowed={this.props.shareAllowed}
          onSharePress={this.props.onSharePress}
          onPrintPress={this.props.onPrintPress}
          title={this.props.title}
        />

        <PhotoView
          source={{ uri: this.props.image }}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType="center"
          style={styles.image}
        />
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },

  image: {
    flex: 1,
    width: 300,
    height: 300,
    zIndex: 0
  }
};

export default PhotoViewer;
