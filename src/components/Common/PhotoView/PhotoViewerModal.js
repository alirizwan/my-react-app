import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";
import PhotoViewer from "./PhotoViewer";

class PhotoViewerModal extends Component {
  static propTypes = {
    onDismiss: PropTypes.func,
    isVisible: PropTypes.bool,

    shareAllowed: PropTypes.bool,
    onSharePress: PropTypes.func,
    onPrintPress: PropTypes.func,
    title: PropTypes.string,
    image: PropTypes.string.isRequired
  };

  render() {
    return (
      <Modal
        animationType={"fade"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
      >
        <PhotoViewer
          onDismiss={this.props.onDismiss}
          shareAllowed={this.props.shareAllowed}
          onSharePress={this.props.onSharePress}
          onPrintPress={this.props.onPrintPress}
          title={this.props.title}
          image={this.props.image}
        />
      </Modal>
    );
  }
}

export default PhotoViewerModal;
