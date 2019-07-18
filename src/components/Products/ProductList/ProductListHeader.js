import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon } from "native-base";

class ProductListHeader extends Component {
  static propTypes = {
    onAdd: PropTypes.func
  };

  render() {
    return (
      <Header hasSearchBar>
        <Left />

        <Body>
          <Title>PRODUCTS</Title>
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

export default ProductListHeader;
