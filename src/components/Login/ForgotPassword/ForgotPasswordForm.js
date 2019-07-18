import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label } from "native-base";

class ForgotPasswordForm extends Component {
  static propTypes = {
    email: PropTypes.string,
    onEmailChange: PropTypes.func
  };

  render() {
    return (
      <Form style={styles.form}>
        <Item fixedLabel last>
          <Label style={styles.label}>Email</Label>

          <Input
            placeholder="Email"
            value={this.props.email}
            onChange={this.props.onEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
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
  },

  divider: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1
  }
};

export default ForgotPasswordForm;
