import React, { Component } from "react";
import PropTypes from "prop-types";

import { List, ListItem, } from "native-base";
import { Left, Right, Body } from "native-base";
import { Text, Icon, Container } from "native-base";

import DiscontinueButton from './DiscontinueButton';

import moment from "moment";

class OpportunityDetails extends Component {
  getDetailItem = (label, value, isLast) => {
    return (
      <ListItem last={isLast}>
        <Left style={styles.left}>
          <Text style={styles.label}>
            {label}
          </Text>
        </Left>

        <Body>
          <Text>
            {value}
          </Text>
        </Body>
      </ListItem>
    );
  };

  getViewApplicationsButton = () => {
    return (
      <ListItem icon onPress={this.props.onApplicationsPress} last>
        <Left>
          <Icon name="paper" />
        </Left>

        <Body>
          <Text>View Applications</Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  getExtendButton = () => {
    return (
      <ListItem onPress={this.props.onExtend} last>
        <Body>
          <Text style={styles.primary}>Extend Opportunity</Text>
        </Body>
      </ListItem>
    );
  };

  getDiscontinueButton = () => {
    return (
      <DiscontinueButton onPress={this.props.onDiscontinue} />
    );
  };

  get commission() {
    return (
      this.props.isPercentage
        ? `${this.props.amount}%`
        : `$${this.props.amount}`
    )
  };

  get status() {
    return this.props.isActive ? 'Active' : 'Inactive'
  };

  get expires() {
    return moment(this.props.expiresAt).format('MMMM D, YYYY');
  };

  get created() {
    return moment(this.props.createdAt).format('MMMM D, YYYY');
  };

  render() {
    return (
      <Container>
        <List style={styles.list}>
          <ListItem itemDivider style={styles.divider} />

          {this.getDetailItem("Commission", this.commission + ' per sale')}
          {this.getDetailItem("Visibility", this.props.visibility)}
          {this.getDetailItem("Status", this.status, true)}

          <ListItem itemDivider style={styles.divider} />

          {this.getDetailItem("Begins", this.created)}
          {this.getDetailItem("Expires", this.expires, true)}

          <ListItem itemDivider style={styles.divider} />

          {this.getViewApplicationsButton()}

          <ListItem itemDivider style={styles.divider} />

          {this.props.isActive && this.getExtendButton()}
          {this.props.isActive && this.getDiscontinueButton()}
        </List>
      </Container>
    );
  }
}

const styles = {
  left: {
    flex: 0,
    width: 120
  },

  danger: {
    textAlign: "center",
    color: "#e74c3c"
  },

  primary: {
    textAlign: "center",
    color: "#1abc9c"
  },

  label: {
    fontWeight: "bold",
    color: "#575757"
  },

  divider: {
    borderTopColor: "#dcdcdc",
    borderBottomColor: "#dcdcdc",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },

  lastDivider: {
    borderTopColor: "#dcdcdc",
    borderTopWidth: 1
  },

  list: {
    backgroundColor: "#fff"
  }
};

export default OpportunityDetails;
