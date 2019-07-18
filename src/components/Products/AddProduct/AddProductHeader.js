import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Body, Left, Right, Button, Title, Text } from "native-base";

class AddProductHeader extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onCancel}>
            <Text>Cancel</Text>
          </Button>
        </Left>

        <Body>
          <Title>ADD PRODUCT</Title>
        </Body>

        <Right>
          <Button transparent onPress={this.props.onSave}>
            <Text>Save</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}

export default AddProductHeader;
