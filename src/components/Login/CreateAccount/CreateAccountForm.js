import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Item, ListItem, Input, Label } from "native-base";

class CreateAccountForm extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,

    onFirstNameChange: PropTypes.func,
    onLastNameChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    onUsernameChange: PropTypes.func,
    onPasswordChange: PropTypes.func
  };

  render() {
    return (
      <Form style={styles.form}>
        <Item fixedLabel>
          <Label style={styles.label}>First Name</Label>

          <Input
            placeholder="First Name"
            value={this.props.firstName}
            onChange={this.props.onFirstNameChange}
            autoCorrect={false}
          />
        </Item>

        <Item fixedLabel last>
          <Label style={styles.label}>Last Name</Label>

          <Input
            placeholder="Last Name"
            value={this.props.lastName}
            onChange={this.props.onLastNameChange}
            autoCorrect={false}
          />
        </Item>

        <ListItem itemDivider style={styles.divider} />

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

        <ListItem itemDivider style={styles.divider} />

        <Item fixedLabel>
          <Label style={styles.label}>Username</Label>

          <Input
            placeholder="Username"
            value={this.props.username}
            onChange={this.props.onUsernameChange}
            autoCapitalize="none"
            autoCorrect={false}
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
  },

  divider: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1
  }
};

export default CreateAccountForm;
