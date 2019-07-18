import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Text, Icon } from "native-base";

class ChangeEmailHeader extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  getCancelButton = () => {
    return this.props.isInModal
      ? <Button onPress={this.props.onDismiss} transparent>
          <Text>Cancel</Text>
        </Button>
      : <Button onPress={this.props.onDismiss} transparent>
          <Icon name="arrow-back" />
        </Button>;
  };
  getRightButton = () => {
    return (
      <Button onPress={this.props.onSubmit} transparent>
        <Text style={styles.label}>Save</Text>
      </Button>
    );
  };

  render() {
    return (
      <Header>
        <Left>
          {this.getCancelButton()}
        </Left>

        <Body>
          <Title>
            {this.props.name}
          </Title>
        </Body>

        <Right>
          {this.getRightButton()}
        </Right>
      </Header>
    );
  }
}

export default ChangeEmailHeader;
