import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label } from "native-base";

class AddOriginAddressForm extends Component {
  static propTypes = {
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,

    onStreet1Change: PropTypes.func,
    onStreet2Change: PropTypes.func,
    onCityChange: PropTypes.func,
    onStateChange: PropTypes.func,
    onPostalCodeChange: PropTypes.func
  };

  render() {
    return (
      <Form style={styles.form}>
        <Item>
          <Input
            placeholder="Street Address"
            value={this.props.street1}
            onChange={this.props.onStreet1Change}
          />
        </Item>

        <Item>
          <Input
            placeholder="Apt. #, suite, etc."
            value={this.props.street2}
            onChange={this.props.onStreet2Change}
          />
        </Item>

        <Item last>
          <Input
            placeholder="City"
            value={this.props.city}
            onChange={this.props.onCityChange}
          />

          <Input
            placeholder="State"
            value={this.props.state}
            onChange={this.props.onStateChange}
          />

          <Input
            placeholder="Zip"
            value={this.props.postalCode}
            onChange={this.props.onPostalCodeChange}
          />
        </Item>
      </Form>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  }
};

export default AddOriginAddressForm;
