import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Text, Icon } from "native-base";

class ProfileHeader extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    onReport: PropTypes.func,
    onEdit: PropTypes.func,

    isInModal: PropTypes.bool,
    isOwner: PropTypes.bool,
    isEditting: PropTypes.bool,
    name: PropTypes.string
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
    if (this.props.isOwner && this.props.isEditting) {
      return this.props.isEditting
        ? <Button onPress={this.props.onSubmit} transparent>
            <Text>Done</Text>
          </Button>
        : <Button onPress={this.props.onEdit} transparent>
            <Text>Edit</Text>
          </Button>;
    } else {
      //TODO: Create report functionality and enable button
      return (
        <Button onPress={this.props.onReport} transparent disabled>
          <Icon name="flag" />
        </Button>
      );
    }
  };

  render() {
    return (
      <Header>
        <Left>
          {this.getCancelButton()}
        </Left>

        <Body>
          <Title>
            {this.props.name.toUpperCase()}
          </Title>
        </Body>

        <Right>
          {this.getRightButton()}
        </Right>
      </Header>
    );
  }
}

export default ProfileHeader;
