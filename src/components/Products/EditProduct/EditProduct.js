import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Container } from "native-base";

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { updateProduct } from "../mutations";

import {
  setName,
  setPrice,
  setDescription,
  setSKU,
  setStock,
  uploadImage,
  initializeWithProduct
} from '@cmp/redux/actions/productForm';

import EditProductHeader from "./EditProductHeader";
import ProductForm from "../ProductForm/ProductForm";

class EditProduct extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func
  };

  get hasActiveOpportunity() {
    return (
      this
        .props
        .product
        .opportunities
        .filter(o => o.isActive)
        .length > 0
    );
  };

  onSave = () => {
    const product = {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price.replace("$", ""),
      stock: this.props.stock,
      description: this.props.description,
      sku: this.props.sku,
      image: this.props.image
    };

    this.props
      .updateProduct({ variables: product })
      .then(_ => this.props.onSubmit());
  };

  onCancel = () => {
    this.props.onDismiss();
  };

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Container>
        <EditProductHeader
          title={this.props.name}
          onCancel={this.onCancel}
          onSave={this.onSave}
        />

        <ProductForm
          name={this.props.name}
          price={this.props.price}
          description={this.props.description}
          sku={this.props.sku}
          stock={this.props.stock}
          image={this.props.image}
          isPriceReadOnly={this.hasActiveOpportunity}
          isUploading={this.props.isUploading}
          isUploaded={this.props.isUploaded}
          onNameChange={this.props.onNameChange}
          onPriceChange={this.props.onPriceChange}
          onDescriptionChange={this.props.onDescriptionChange}
          onSKUChange={this.props.onSKUChange}
          onStockChange={this.props.onStockChange}
          onImageError={error => alert(error)}
          onImageUpload={this.props.onImageUpload}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.productForm
});

const mapActionsToProps = (dispatch, ownProps) => ({
  onNameChange: e => dispatch(setName(e.nativeEvent.text)),
  onPriceChange: e => dispatch(setPrice(e.nativeEvent.text)),
  onDescriptionChange: e => dispatch(setDescription(e.nativeEvent.text)),
  onSKUChange: e => dispatch(setSKU(e.nativeEvent.text)),
  onStockChange: e => dispatch(setStock(e.nativeEvent.text)),
  onImageUpload: e => dispatch(uploadImage(e)),
  onMount: _ => dispatch(initializeWithProduct(ownProps.product))
});

export default compose(graphql(updateProduct, { name: "updateProduct" }))(
  connect(mapStateToProps, mapActionsToProps)(EditProduct)
);
