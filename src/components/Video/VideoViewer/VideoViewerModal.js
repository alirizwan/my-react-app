import React, { Component } from "react";
import { Modal } from "react-native";

import { connect } from "react-redux";
import { toggleVisible } from "@cmp/redux/actions/videoViewer";

import VideoViewer from "./VideoViewer";

class VideoViewerModal extends Component {
  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
      >
        <VideoViewer onDismiss={this.props.onDismiss} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...state.videoViewer
});

const mapActionsToProps = dispatch => ({
  onDismiss: _ => dispatch(toggleVisible())
});

export default (connect(mapStateToProps, mapActionsToProps)(VideoViewerModal));
