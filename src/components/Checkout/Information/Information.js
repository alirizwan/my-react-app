import React, {Component} from 'react';
import queryString from 'query-string';

import {connect} from "react-redux";
import { createOrder, createAddress } from "../mutations";
import { getProductById } from '../queries';

import { compose, withApollo, graphql, gql } from "react-apollo";
import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from 'react-native-dotenv';

import {Button, Text, View, ScrollView} from "react-native";
import {ListItem} from "native-base";
import CreditCardForm from "../Payment/CreditCardForm";
import BottomActionButton from "../Common/BottomActionButton";
import ContactDetailsForm from "./ContactDetailsForm";
import ShippingDetailsForm from "./ShippingDetailsForm";
import CheckoutHeader from '../Common/CheckoutHeader';

import styles from '../styles';

class Information extends Component {

  static navigationOptions = {
    title: "Billing Information",
    headerStyle: styles.topHeader,
    headerBackTitleStyle: { display: 'none' }
  };

  purchase = async _ => {
    const addressResult = await this.props.createAddress({
      variables: {
        address: {
          name: [this.props.firstName, this.props.lastName].join(" "),
          phone: this.props.phone,
          email: this.props.email,
          street1: this.props.streetName,
          city: this.props.city,
          postalCode: this.props.postalCode,
          country: this.props.country,
          state: '',
          type: 'Destination'
        }
      }
    });

    const expMonth = this.props.expirationDate.split("/")[0];
    const expYear = this.props.expirationDate.split("/")[1];

    const cardDetails = {
      "card[number]": this.props.cardNumber,
      "card[exp_month]": expMonth,
      "card[exp_year]": expYear,
      "card[cvc]": this.props.cvv
    };

    const formBody = queryString.stringify(cardDetails);

    const response = await fetch('https://api.stripe.com/v1/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ' + REACT_APP_STRIPE_PUBLISHABLE_KEY
      },
      body: formBody
    });

    const billingCardTokenJson = await response.json();
    const billingCardTokenId = billingCardTokenJson.id;


    await this.props.createOrder({
      variables: {
        order: {
          tokenId: billingCardTokenId,
          productId: this.props.data.products[0].id,
          addressId: addressResult.data.createAddress.id,
          opportunityId: this.props.screenProps.opportunity
        }
      }
    });

    this.props.navigation.navigate("Confirmation");
  };

  onBack = _ => {
    this.props.navigation.goBack();
  };

  render() {
    const { products } = this.props.data;
    
    return (
      <View style={styles.container}>
        <CheckoutHeader
          product={products[0]}
          onBack={this.onBack}
        />

        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Contact Details</Text>
          </View>

          <View>
            <ContactDetailsForm />
          </View>

          <View style={styles.header}>
            <Text style={styles.headerLabel}>Shipping Details</Text>
          </View>

          <View style={styles.content}>
            <ShippingDetailsForm />
          </View>
        </ScrollView>

        <BottomActionButton
          label="Purchase"
          onPress={this.purchase}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.checkout
});

export default compose(
  graphql(getProductById, {
    options: ({ screenProps }) => ({
      variables: { product: screenProps.product }
    })
  }),

  graphql(createOrder, { name: 'createOrder' }),
  graphql(createAddress, { name: 'createAddress' }),
  connect(mapStateToProps)
)(Information);
