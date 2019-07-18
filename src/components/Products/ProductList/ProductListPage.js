import React, { Component } from "react";
import { Container } from "native-base";

import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { getProducts } from "../queries";
import { setQuery } from "@cmp/redux/actions/productList";

import {AsyncStorage} from "react-native";
import AddProductModal from "../AddProduct/AddProductModal";
import ProductListHeader from "./ProductListHeader";
import ProductList from "./ProductList";

class ProductListPage extends Component {
  static navigationOptions = {
    title: "Products"
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

  onShowAddProduct = async () => {
    const token = await AsyncStorage.getItem("@cmp:id_token");
    if (token) {
      this.setState({ addProductVisible: true });
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  onItemPress = product => {
    this.props.navigation.navigate("ProductDetail", { product: product.id });
  };

  render() {
    const { stores, networkStatus, refetch } = this.props.data;
    const products = stores ? stores.products : [];

    return (
      <Container>
        <ProductListHeader onAdd={this.onShowAddProduct} />

        <AddProductModal
          isVisible={this.state.addProductVisible}
          onDismiss={this.onDismissAddProduct}
        />
        <ProductList
          query={this.props.query}
          onQueryChange={this.props.onQueryChange}
          products={products || []}
          isRefreshing={networkStatus === 4}
          onRefresh={refetch}
          onItemPress={this.onItemPress}
          onAddItem={this.onShowAddProduct}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.productList
});

const mapDispatchToProps = dispatch => ({
  onQueryChange: e => dispatch(setQuery(e.nativeEvent.text))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getProducts)
)(ProductListPage);
