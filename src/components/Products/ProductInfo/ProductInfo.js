import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ProductInfoPage from './ProductInfoPage/ProductInfoPage';
import PartnerWithProductPage from './PartnerWithProductPage/PartnerWithProductPage';
import Checkout from '../../Checkout/Checkout';

class Products extends Component {
  getRoutes() {
    return {
      ProductInfo: { screen: ProductInfoPage, path: 'product' },
      PartnerWithProduct: { screen: PartnerWithProductPage, path: 'product/partner' },
      PurchaseProduct: { screen: Checkout, path: 'product/purchase' }
    };
  }

  getOptions() {
    return {
      headerMode: 'none',
      initialRouteName: 'ProductInfo'
    };
  }

  render() {
    const screenProps = {
      opportunity: this.props.opportunity,
      product: this.props.product,
      onDismiss: this.props.onDismiss
    };
    const Navigation = StackNavigator(this.getRoutes(), this.getOptions());
    return <Navigation screenProps={screenProps} />;
  }
}

export default Products;
