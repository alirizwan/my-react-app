import React, { Component } from "react";
import { Form, Item, Input, Label } from "native-base";

import { Keyboard } from "react-native";
import PropTypes from "prop-types";

class ChangeEmailForm extends Component {
  static propTypes = {
    email: PropTypes.string,
    onEmailChange: PropTypes.func
  };

  render() {
    return (
      <Form style={styles.form}>
        <Item fixedLabel>
          <Label style={styles.label}>Email Address</Label>
          <Input
            placeholder="Email Address"
            value={this.props.email}
            onChange={this.props.onEmailChange}
            keyboardType="email-address"
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

export default ChangeEmailForm;
