import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header, Left, Right, Body, Button, Icon } from 'native-base';
import { Title } from 'native-base';

class ProductInfoHeader extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string
    }),
    onDismiss: PropTypes.func
  };

  render() {
    return (
      <Header>
        <Left>
          <Button onPress={this.props.onDismiss} transparent>
            <Icon name="arrow-down" />
          </Button>
        </Left>

        <Body>
          <Title>
            {this.props.product.name.toUpperCase()}
          </Title>
        </Body>

        <Right />
      </Header>
    )
  }
}

export default ProductInfoHeader;
