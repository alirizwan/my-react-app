import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View } from "react-native";

import ProductInfo from "./ProductInfo";
import CommentList from "./CommentList";

class CommentModal extends Component {
  static propTypes = {
    video: PropTypes.string,
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isVisible: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
        transparent
      >
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <View style={{ height: 500 }}>
            <CommentList
              video={this.props.video}
              onSubmit={this.props.onSubmit}
              onDismiss={this.props.onDismiss}
              isInModal
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default CommentModal;