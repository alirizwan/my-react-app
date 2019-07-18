import React, {Component} from 'react';
import {Form, Input, Item} from "native-base";
import {connect} from "react-redux";
import {setCity, setCountry, setPostalCode, setStreetName} from "@cmp/redux/actions/checkout";
import {Text} from "react-native";

class ShippingDetailsForm extends Component {
  render() {
    return (
      <Form style={styles.form}>
        <Item last>
          <Input
            placeholder="Street Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.props.streetName}
            onChange={this.props.onStreetNameChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="City"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.props.city}
            onChange={this.props.onCityChange}
          />

          <Input
            placeholder="Postal Code"
            keyboardType="numeric"
            value={this.props.postalCode}
            onChange={this.props.onPostalCodeChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="Country"
            autoCapitalize="words"
            value={this.props.country}
            onChange={this.props.onCountryChange}
          />
        </Item>
      </Form>
    );
  }
}


const styles = {
  form: {
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  }
};

const mapStateToProps = (state) => ({
  ...state.checkout
});

const mapDispatchToProps = (dispatch) => ({
  onStreetNameChange: e => dispatch(setStreetName(e.nativeEvent.text)),
  onCityChange: e => dispatch(setCity(e.nativeEvent.text)),
  onPostalCodeChange: e => dispatch(setPostalCode(e.nativeEvent.text)),
  onCountryChange: e => dispatch(setCountry(e.nativeEvent.text)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingDetailsForm);
