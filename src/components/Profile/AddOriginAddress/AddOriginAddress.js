import React, { Component } from "react";
import PropTypes from "prop-types";

import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import {
  setStreet1,
  setStreet2,
  setCity,
  setState,
  setPostalCode
} from "@cmp/redux/actions/addressForm";
import { createAddress, updateAccount } from "../mutations";
import { getAccountById } from "../queries";

import { Container } from "native-base";
import { Text, KeyboardAvoidingView } from "react-native";
import AddOriginAddressForm from "./AddOriginAddressForm";
import AddOriginAddressHeader from "./AddOriginAddressHeader";

class AddOriginAddress extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool,
    name: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired
  };

  onSubmit = async () => {
    const addressResult = await this.props.createAddress({
      variables: {
        street1: this.props.street1,
        street2: this.props.street2,
        city: this.props.city,
        state: this.props.state,
        postalCode: this.props.postalCode,
        name: this.props.name
      }
    });

    await this.props.updateAccount({
      variables: {
        id: this.props.accountId,
        addressId: addressResult.data.createAddress.id
      }
    });

    const addressObject = {
      street1: this.props.street1,
      street2: this.props.street2,
      city: this.props.city,
      state: this.props.state,
      postalCode: this.props.postalCode
    };

    this.props.onSubmit(addressObject);
  };

  render() {
    return (
      <Container>
        <AddOriginAddressHeader
          onDismiss={this.props.onDismiss}
          onSubmit={this.onSubmit}
          isInModal={this.props.isInModal}
        />

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <AddOriginAddressForm
            street1={this.props.street1}
            street2={this.props.street2}
            city={this.props.city}
            state={this.props.state}
            postalCode={this.props.postalCode}
            onStreet1Change={this.props.onStreet1Change}
            onStreet2Change={this.props.onStreet2Change}
            onCityChange={this.props.onCityChange}
            onStateChange={this.props.onStateChange}
            onPostalCodeChange={this.props.onPostalCodeChange}
          />

          <Text style={styles.info}>
            Your origin address allows us to automatically calculate shipping
            costs, charge your customers for flat rate shipping, and create a
            shipping label for you.
          </Text>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = {
  info: {
    padding: 20,
    fontSize: 16,
    color: "#434343"
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  }
};

const mapStateToProps = state => ({
  ...state.addressForm
});

const mapActionsToProps = dispatch => ({
  onStreet1Change: e => dispatch(setStreet1(e.nativeEvent.text)),
  onStreet2Change: e => dispatch(setStreet2(e.nativeEvent.text)),
  onCityChange: e => dispatch(setCity(e.nativeEvent.text)),
  onStateChange: e => dispatch(setState(e.nativeEvent.text)),
  onPostalCodeChange: e => dispatch(setPostalCode(e.nativeEvent.text))
});

export default compose(
  graphql(createAddress, { name: "createAddress" }),
  graphql(updateAccount, {
    options: props => ({
      refetchQueries: [
        { query: getAccountById, variables: { id: props.accountId } }
      ]
    }),
    name: "updateAccount"
  })
)(connect(mapStateToProps, mapActionsToProps)(AddOriginAddress));
