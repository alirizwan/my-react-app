import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import { ProductById } from '../queries';

import { Container } from 'native-base';
import { StatusBar, ActivityIndicator, ScrollView, Text } from 'react-native';

import ProductInfoHeader from './ProductInfoHeader';
import ProductImage from './ProductImage';
import ProductNameAndPrice from './ProductNameAndPrice';
import ProductDescription from './ProductDescription';
import ProductBuyButton from './ProductBuyButton';
import ProductOpportunity from './ProductOpportunity';

class ProductInfoPage extends Component {
  onPartner = () => {
    this.props.navigation.navigate('PartnerWithProduct');
  };

  onPurchase = () => {
    this.props.navigation.navigate('PurchaseProduct');
  };

  render() {
    const { loading, products } = this.props.data;

    if (loading) {
      return (
        <Container style={styles.loading}>
          <StatusBar hidden={false} barStyle="light-content" />
          <ActivityIndicator animating size="small" />
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <StatusBar hidden={false} barStyle="light-content" />

          <ProductInfoHeader
            onDismiss={this.props.screenProps.onDismiss}
            product={products[0]}
          />

          <ScrollView style={styles.scrollView}>
            <ProductImage product={products[0]} />
            <ProductNameAndPrice product={products[0]} />
            <ProductDescription product={products[0]} />
            <ProductOpportunity product={products[0]} onPartner={this.onPartner} />
          </ScrollView>

          <ProductBuyButton onPress={this.onPurchase} product={products[0]} />
        </Container>
      );
    }
  }
}

const styles = {
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollView: {
    flex: 1
  },

  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  }
};

export default compose(
  graphql(ProductById, {
    options: ({ screenProps }) => ({
      variables: { product: screenProps.product }
    })
  })
)(ProductInfoPage);
