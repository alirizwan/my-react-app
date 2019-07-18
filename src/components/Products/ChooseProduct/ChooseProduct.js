import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "native-base";

import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { getProducts } from "../queries";
import { setQuery } from "@cmp/redux/actions/productList";

import ChooseProductHeader from "./ChooseProductHeader";
import AddProductModal from "../AddProduct/AddProductModal";
import ProductList from "../ProductList/ProductList";

class ChooseProduct extends Component {
  static navigationOptions = {
    title: "Products"
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func
  };

  componentWillMount() {
    this.state = {
      addProductVisible: false
    };
  }

  onDismissAddProduct = () => {
    this.setState({ addProductVisible: false });
    this.props.data.refetch();
  };

  onShowAddProduct = () => {
    this.setState({ addProductVisible: true });
  };

  onItemPress = product => {
    this.props.onSubmit(product);
  };

  render() {
    const { products, networkStatus, refetch } = this.props.data;

    return (
      <Container>
        <ChooseProductHeader
          onAdd={this.onShowAddProduct}
          onDismiss={this.props.onDismiss}
        />

        <AddProductModal
          isVisible={this.state.addProductVisible}
          onDismiss={this.onDismissAddProduct}
        />

        <ProductList
          query={this.props.query}
          style={styles.container}
          itemStyle={styles.productItem}
          products={products || []}
          isRefreshing={networkStatus === 4}
          onRefresh={refetch}
          onItemPress={this.onItemPress}
          onAddItem={this.onShowAddProduct}
          onQueryChange={this.props.onQueryChange}
        />
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
  },

  productItem: {}
};

const mapStateToProps = state => ({
  ...state.productList
});

const mapDispatchToProps = dispatch => ({
  onQueryChange: e => dispatch(setQuery(e.nativeEvent.text))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProducts)
)(ChooseProduct);
