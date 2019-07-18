import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";

import ChooseProduct from "./ChooseProduct";

class ChooseProductModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onDismiss: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
        transparent
      >
        <ChooseProduct
          onSubmit={this.props.onSubmit}
          onDismiss={this.props.onDismiss}
        />
      </Modal>
    );
  }
}

export default ChooseProductModal;
