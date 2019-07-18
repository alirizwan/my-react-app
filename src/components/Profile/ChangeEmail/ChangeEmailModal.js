import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View } from "react-native";
import ChangeEmail from "./ChangeEmail";

class ChangeEmailModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isVisible: PropTypes.bool.isRequired
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType={"slide"}
          visible={this.props.isVisible}
          onRequestClose={this.props.onDismiss}
        >
          <ChangeEmail
            onSubmit={this.props.onSubmit}
            onDismiss={this.props.onDismiss}
            isInModal={true}
          />
        </Modal>
      </View>
    );
  }
}
export default ChangeEmailModal;
