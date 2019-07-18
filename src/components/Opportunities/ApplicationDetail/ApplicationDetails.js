import React, { Component } from "react";
import PropTypes from "prop-types";

import { List, ListItem, } from "native-base";
import { Left, Right, Body } from "native-base";
import { Text, Icon, Container } from "native-base";

import ApproveButton from './ApproveButton';
import RejectButton from './RejectButton';

import moment from "moment";

class ApplicationDetails extends Component {
  get createdAt() {
    return moment(this.props.createdAt).format('MMMM D, YYYY');
  };

  get isUnread() {
    return this.props.status === 'Unread';
  };

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


  render() {
    return (
      <Container>
        <List style={styles.list}>
          <ListItem itemDivider style={styles.divider} />

          {this.getDetailItem("Applied", this.createdAt)}
          {this.getDetailItem("Status", this.props.status, true)}

          <ListItem itemDivider style={styles.divider} />

          { this.isUnread && <ApproveButton onPress={this.props.onApprove} /> }
          { this.isUnread && <RejectButton onPress={this.props.onReject} /> }
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

export default ApplicationDetails;
