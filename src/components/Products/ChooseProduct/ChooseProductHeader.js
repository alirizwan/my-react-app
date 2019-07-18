import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Header, Left, Body, Right, Title, Button, Icon } from "native-base";

class ChooseProductHeader extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    onDismiss: PropTypes.func
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onDismiss}>
            <Text>Cancel</Text>
          </Button>
        </Left>

        <Body>
          <Title>CHOOSE A PRODUCT</Title>
        </Body>

        <Right>
          <Button transparent onPress={this.props.onAdd}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default ChooseProductHeader;
