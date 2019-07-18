import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Body, Left, Right, Button, Title, Text } from "native-base";

class EditProductHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
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
          <Title>
            {this.props.title.toUpperCase() || "UNTITLED"}
          </Title>
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

export default EditProductHeader;
