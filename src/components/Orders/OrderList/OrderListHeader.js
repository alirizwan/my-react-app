import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon } from "native-base";

class ProductListHeader extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onDismiss}>
            <Icon name="arrow-back" />
          </Button>
        </Left>

        <Body>
          <Title>ORDERS</Title>
        </Body>

        <Right />
      </Header>
    );
  }
}

export default ProductListHeader;
