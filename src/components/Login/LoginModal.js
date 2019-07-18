import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";

import Login from "./Login";

class LoginModal extends Component {
  static propTypes = {
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
      >
        <Login
          onSubmit={this.props.onSubmit}
          onDismiss={this.props.onDismiss}
          isInModal
        />
      </Modal>
    );
  }
}

export default LoginModal;
