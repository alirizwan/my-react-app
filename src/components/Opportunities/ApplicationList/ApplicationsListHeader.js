import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon } from "native-base";

class ApplicationsListHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func
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
          <Title>APPLICATIONS</Title>
        </Body>

        <Right>
          <Button transparent>
          </Button>
        </Right>
      </Header>
    );
  }
}

export default ApplicationsListHeader;
