import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header, Left, Right, Body, Button, Icon } from 'native-base';
import { Title } from 'native-base';

class PartnerWithProductHeader extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string
    }),
    onBack: PropTypes.func
  };

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
            {('Sell ' + this.props.product.name).toUpperCase()}
          </Title>
        </Body>

        <Right />
      </Header>
    )
  }
}

export default PartnerWithProductHeader;
