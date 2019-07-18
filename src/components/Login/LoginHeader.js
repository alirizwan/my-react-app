import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Right, Body, Title, Button, Text, Icon } from "native-base";

class LoginHeader extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  getCancelButton = () => {
    return this.props.isInModal
      ? <Button onPress={this.props.onDismiss} transparent>
          <Text>Cancel</Text>
        </Button>
      : <Button onPress={this.props.onDismiss} transparent>
          <Icon name="arrow-back" />
        </Button>;
  };

  render() {
    return (
      <Header>
        <Left>
          {this.getCancelButton()}
        </Left>

        <Body>
          <Title>LOGIN</Title>
        </Body>

        <Right />
      </Header>
    );
  }
}

export default LoginHeader;
