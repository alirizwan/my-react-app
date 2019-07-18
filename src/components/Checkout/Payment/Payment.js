import React, {Component} from 'react';
import PropTypes from "prop-types";

import { Text, View, Platform, ActivityIndicator } from "react-native";
import { ListItem } from "native-base";

import CreditCardForm from "./CreditCardForm";
import BottomActionButton from "../Common/BottomActionButton";
import ApplePayButton from "../Common/ApplePayButton";
import CheckoutHeader from '../Common/CheckoutHeader';

import styles from '../styles';

import { getProductById } from '../queries';
import { createOrder, createAddress } from "../mutations";
import { compose, graphql } from "react-apollo";

import { REACT_APP_STRIPE_PUBLISHABLE_KEY, REACT_APP_MERCHANT_ID } from "react-native-dotenv";
import stripe from "tipsi-stripe";

stripe.init({
  publishableKey: REACT_APP_STRIPE_PUBLISHABLE_KEY,
  merchantId: REACT_APP_MERCHANT_ID,
  androidPayMode: 'test'
});

class Payment extends Component {
  static navigationOptions = {
    title: "Payment",
    headerStyle: styles.topHeader
  };

  onBack = _ => {
    this.props.screenProps.onDismiss();
  };

  goToNextPage = _ => {
    this.props.navigation.navigate("Information");
  };

  applePayCheckout = async _ => {
    const items = [{
      label: 'Comp',
      amount: this.props.data.products[0].price.toString()
    }];

    const options = {
      requiredBillingAddressFields: 'all',
      requiredShippingAddressFields: 'all',
    };

    try {
      const token = await stripe.paymentRequestWithApplePay(items,options);

      const addressResult = await this.props.createAddress({
        variables: {
          address: {
            name: token.extra.shippingContact.name,
            phone: token.extra.shippingContact.phone,
            email: token.extra.shippingContact.email,
            street1: token.extra.shippingContact.street,
            city: token.extra.shippingContact.city,
            state: token.extra.shippingContact.state,
            postalCode: token.extra.shippingContact.postalCode,
            country: token.extra.shippingContact.ISOCountryCode,
            type: 'Destination'
          }
        }
      });

      await this.props.createOrder({
        variables: {
          order: {
            productId: this.props.data.products[0].id,
            addressId: addressResult.data.createAddress.id,
            tokenId: token.tokenId,
            opportunityId: this.props.screenProps.opportunity
          },
        }
      });

      await stripe.completeApplePayRequest();
      this.props.navigation.navigate("Confirmation");
    } catch(err) {
      stripe.cancelApplePayRequest();
    }
  };

  getExpressHeader = _ => {
    return <View style={styles.header}>
        <Text style={styles.headerLabel}>
          Express Checkout
        </Text>
      </View>
  };

  getApplePayButton = _ => {
    return <ApplePayButton onPress={this.applePayCheckout}/>
  };

  render() {
    const { products, loading } = this.props.data;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <CheckoutHeader
            product={products[0]}
            onBack={this.onBack}
          />

          <View style={styles.header}>
            <Text style={styles.headerLabel}>Card Details</Text>
          </View>

          <View style={styles.content}>
            <CreditCardForm />
            {Platform.OS === 'ios' && this.getExpressHeader()}
            {Platform.OS === 'ios' && this.getApplePayButton()}
          </View>

          <BottomActionButton
            label="Next"
            onPress={this.goToNextPage}
          />
        </View>
      );
    }
  }
}

export default compose(
  graphql(getProductById, {
    options: ({ screenProps }) => ({
      variables: { product: screenProps.product }
    })
  }),

  graphql(createOrder, { name: 'createOrder' }),
  graphql(createAddress, { name: 'createAddress' })
)(Payment);
