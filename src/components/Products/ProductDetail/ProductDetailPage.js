import React, { Component } from 'react';
import { Container, Spinner } from 'native-base';
import { ScrollView } from 'react-native';

import { setProduct, setOpportunity } from '@cmp/redux/actions/video';
import { startEditing, stopEditing } from '@cmp/redux/actions/productDetails';
import { connect } from 'react-redux';

import { compose, graphql } from 'react-apollo';
import { getProductById, getProducts } from '../queries';
import { deleteProductById } from '../mutations';

import EditProductModal from "../EditProduct/EditProductModal";
import ProductDetailHeader from "./ProductDetailHeader";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import GoLiveButton from "../../Common/GoLiveButton";

class ProductDetailPage extends Component {
  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onDelete = () => {
    this.props.deleteProduct().then(this.onDismiss);
  };

  onGoLive = () => {
    const product = this.props.data.products[0];
    const account = this.props.id;
    var opportunity = null;

    if(product.owner != this.props.id) {
      opportunity = product.activeOpportunity;
    }

    this.props.onGoLive(product, opportunity);
    this.props.screenProps.rootNavigation.navigate("Video");
  };

  onViewOrders = () => {
    const { id } = this.props.data.products[0];
    this.props.navigation.navigate("OrderList", { product: id });
  };

  onViewOpportunities = () => {
    const { id } = this.props.data.products[0];
    this.props.navigation.navigate("OpportunityList", { product: id });
  };

  render() {
    const { products, loading } = this.props.data;

    if (loading) {
      return (
        <Container style={styles.loading}>
          <Spinner />
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <EditProductModal
            product={products[0]}
            isVisible={this.props.isEditing}
            onDismiss={this.props.onDone}
          />

          <ProductDetailHeader
            title={products[0].name}
            onBack={this.onDismiss}
            onEdit={this.props.onEdit}
          />

          <ScrollView>
            <ProductImage
              source={{ uri: products[0].images[0].url }}
            />

            <ProductDetails
              name={products[0].name}
              price={products[0].price}
              description={products[0].description}
              onViewOrders={this.onViewOrders}
              onViewOpportunities={this.onViewOpportunities}
              onDelete={this.onDelete}
            />
          </ScrollView>

          <GoLiveButton onPress={this.onGoLive} />
        </Container>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4"
  },

  scrollView: {
    flex: 1
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = state => ({
  ...state.productDetails,
  ...state.account
});

const mapDispatchToProps = dispatch => ({
  onGoLive: (product, opportunity) => {
    dispatch(setProduct(product));
    dispatch(setOpportunity(opportunity));
  },
  onEdit: _ => dispatch(startEditing()),
  onDone: _ => dispatch(stopEditing())
});

export default compose(

  graphql(getProductById, {
    options: ({ navigation }) => ({
      variables: { id: navigation.state.params.product }
    })
  }),

  graphql(deleteProductById, {
    options: ({ navigation }) => ({
      refetchQueries: [{ query: getProducts }],
      variables: { id: navigation.state.params.product }
    }),
    name: "deleteProduct"
  }),

  connect(mapStateToProps, mapDispatchToProps)

)(ProductDetailPage);
