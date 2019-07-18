import React, { Component } from "react";
import PropTypes from "prop-types";

import { ScrollView, RefreshControl } from "react-native";
import { List } from "native-base";

import ProductListItem from "./ProductListItem";
import ProductListSearchHeader from "./ProductListSearchHeader";
import AddProductListItem from "./AddProductListItem";

class ProductList extends Component {
  static propTypes = {
    query: PropTypes.string,
    onQueryChange: PropTypes.func,
    isRefreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onItemPress: PropTypes.func,
    onAddItem: PropTypes.func,
    products: PropTypes.array.isRequired,
    style: PropTypes.object,
    itemStyle: PropTypes.object
  };

  getRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
      />
    );
  };

  getProductListItem = product => {
    return (
      <ProductListItem
        key={product.id}
        name={product.name}
        description={product.description}
        image={product.images[0].url}
        price={product.price}
        onPress={_ => this.props.onItemPress(product)}
        ownerName={product.owner.name}
        ownerPicture={product.owner.picture}
        style={this.props.itemStyle}
      />
    );
  };

  getAddProductItem = product => {
    return <AddProductListItem onPress={this.props.onAddItem} />;
  };

  getSearchHeader = () =>
    <ProductListSearchHeader
      query={this.props.query}
      onQueryChange={this.props.onQueryChange}
    />;

  render() {
    const filteredProducts = this.props.products.filter(
      p => p.name.toLowerCase().indexOf(this.props.query.toLowerCase()) !== -1
    );

    return (
      <ScrollView
        style={Object.assign({}, styles.container, this.props.style)}
        refreshControl={this.getRefreshControl()}
      >
        {this.getSearchHeader()}
        {filteredProducts.map(this.getProductListItem)}
        {this.getAddProductItem()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    paddingTop: 0
  }
};

export default ProductList;
