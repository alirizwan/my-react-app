import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon, Text } from "native-base";

class ProductDetailHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
    onEdit: PropTypes.func
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>

        <Body>
          <Title>
            {this.props.title.toUpperCase()}
          </Title>
        </Body>

        <Right>
          <Button onPress={this.props.onEdit} transparent>
            <Text>Edit</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}

export default ProductDetailHeader;
