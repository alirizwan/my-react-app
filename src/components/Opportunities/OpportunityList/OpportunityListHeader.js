import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Left, Body, Right, Title, Button, Icon } from "native-base";

class OpportunityListHeader extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    onDismiss: PropTypes.func,
    addVisible: PropTypes.bool
  };

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onDismiss}>
            <Icon style={styles.button} name="arrow-back" />
          </Button>
        </Left>

        <Body>
          <Title>OPPORTUNITIES</Title>
        </Body>

        <Right>
          {
            this.props.addVisible &&
            <Button transparent onPress={this.props.onAdd}>
              <Icon name="add" />
            </Button>
          }
        </Right>
      </Header>
    );
  }
}

export default OpportunityListHeader;
