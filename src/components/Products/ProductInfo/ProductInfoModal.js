import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View } from "react-native";

import ProductInfo from "./ProductInfo";

class ProductInfoModal extends Component {
  static propTypes = {
    product: PropTypes.string,
    opportunity: PropTypes.string,
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
            <ProductInfo
              product={this.props.product}
              opportunity={this.props.opportunity}
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

export default ProductInfoModal;
