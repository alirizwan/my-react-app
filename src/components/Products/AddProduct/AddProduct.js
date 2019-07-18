import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Container } from "native-base";

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { createProduct } from "../mutations";

import {
  setName,
  setPrice,
  setDescription,
  setSKU,
  setStock,
  uploadImage,
  resetForm
} from '@cmp/redux/actions/productForm';

import AddProductHeader from "./AddProductHeader";
import ProductForm from "../ProductForm/ProductForm";

class AddProduct extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func
  };

  onSave = () => {
    const product = {
      name: this.props.name,
      price: this.props.price.replace("$", ""),
      description: this.props.description,
      sku: this.props.sku,
      stock: this.props.stock,
      image: this.props.image
    };

    this.props
      .createProduct({ variables: product })
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
        <AddProductHeader onCancel={this.onCancel} onSave={this.onSave} />

        <ProductForm
          name={this.props.name}
          price={this.props.price}
          description={this.props.description}
          sku={this.props.sku}
          stock={this.props.stock}
          image={this.props.image}
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

const mapActionsToProps = dispatch => ({
  onNameChange: e => dispatch(setName(e.nativeEvent.text)),
  onPriceChange: e => dispatch(setPrice(e.nativeEvent.text)),
  onDescriptionChange: e => dispatch(setDescription(e.nativeEvent.text)),
  onSKUChange: e => dispatch(setSKU(e.nativeEvent.text)),
  onStockChange: e => dispatch(setStock(e.nativeEvent.text)),
  onImageUpload: e => dispatch(uploadImage(e)),
  onMount: _ => dispatch(resetForm())
});

export default compose(graphql(createProduct, { name: "createProduct" }))(
  connect(mapStateToProps, mapActionsToProps)(AddProduct)
);
