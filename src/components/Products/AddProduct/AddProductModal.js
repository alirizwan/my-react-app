import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";

import AddProduct from "./AddProduct";

class AddProductModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onDismiss: PropTypes.func
  };

  render() {
    return (
      <Modal
        animationType={"slide"}
        visible={this.props.isVisible}
        onRequestClose={this.props.onDismiss}
      >
        <AddProduct
          onSubmit={this.props.onDismiss}
          onDismiss={this.props.onDismiss}
        />
      </Modal>
    );
  }
}

export default AddProductModal;
