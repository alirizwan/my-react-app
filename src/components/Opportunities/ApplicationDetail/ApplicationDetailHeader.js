import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon, Text } from "native-base";

class ApplicationDetailHeader extends Component {
  static propTypes = {
    onBack: PropTypes.func
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
          <Title>APPLICATION</Title>
        </Body>

        <Right>
        </Right>
      </Header>
    );
  }
}

export default ApplicationDetailHeader;
