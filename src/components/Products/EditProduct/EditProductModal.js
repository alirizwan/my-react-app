import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";

import EditProduct from "./EditProduct";

class EditProductModal extends Component {
  static propTypes = {
    product: PropTypes.object,
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
        <EditProduct
          product={this.props.product}
          onSubmit={this.props.onDismiss}
          onDismiss={this.props.onDismiss}
        />
      </Modal>
    );
  }
}

export default EditProductModal;
