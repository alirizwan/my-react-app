import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";
import AddOriginAddress from "./AddOriginAddress";

class AddOriginAddressModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isVisible: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
      >
        <AddOriginAddress
          onSubmit={this.props.onSubmit}
          onDismiss={this.props.onDismiss}
          isInModal
          name={this.props.name}
          accountId={this.props.accountId}
        />
      </Modal>
    );
  }
}

export default AddOriginAddressModal;
