import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Item, Input, Label } from "native-base";

class LoginForm extends Component {
  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onUsernameChange: PropTypes.func,
    onPasswordChange: PropTypes.func
  };

  render() {
    return (
      <Form style={styles.form}>
        <Item fixedLabel>
          <Label style={styles.label}>Username</Label>

          <Input
            placeholder="Username"
            value={this.props.username}
            onChange={this.props.onUsernameChange}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </Item>

        <Item fixedLabel last>
          <Label style={styles.label}>Password</Label>

          <Input
            placeholder="Password"
            value={this.props.password}
            onChange={this.props.onPasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
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

export default LoginForm;
