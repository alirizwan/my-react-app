import React, { Component } from 'react';
import { Header, Left, Right, Body } from 'native-base';
import { Title, Button, Icon } from 'native-base';

class CheckoutHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button onPress={this.props.onBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>

        <Body>
          <Title>
            {`Buy ${this.props.product.name}`.toUpperCase()}
          </Title>
        </Body>

        <Right />
      </Header>
    )
  }
}

export default CheckoutHeader;
