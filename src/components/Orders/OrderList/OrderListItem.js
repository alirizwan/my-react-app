import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ListItem, Right, Body, Text, Icon } from "native-base";

class OrderListItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    isLast: PropTypes.bool
  };

  formatDate = date => moment(date).format("MMMM D, YYYY [at] h:mm A");

  render() {
    return (
      <ListItem onPress={this.props.onPress} last={this.props.isLast}>
        <Body>
          <Text style={styles.number}>
            #{this.props.id}
          </Text>
          <Text style={styles.name}>
            {this.props.email}
          </Text>
          <Text style={styles.details}>
            ${this.props.amount} &middot;{" "}
            {this.formatDate(this.props.createdAt)}
          </Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}

const styles = {
  number: { fontWeight: "bold" },
  details: { color: "#ccc" }
};

export default OrderListItem;
