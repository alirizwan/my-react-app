import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-native";

import AddOpportunity from "./AddOpportunity";

class AddOpportunityModal extends Component {
  static propTypes = {
    product: PropTypes.string,
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
        <AddOpportunity
          onSubmit={this.props.onSubmit}
          onDismiss={this.props.onDismiss}
          product={this.props.product}
          isInModal
        />
      </Modal>
    );
  }
}

export default AddOpportunityModal;
