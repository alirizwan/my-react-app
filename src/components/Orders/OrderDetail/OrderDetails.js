import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Container
} from "native-base";
import moment from "moment";
import currency from "currency-formatter";

class OrderDetails extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    destinationName: PropTypes.string,
    destinationPhone: PropTypes.string,
    destinationEmail: PropTypes.string,
    destinationStreet1: PropTypes.string,
    destinationCity: PropTypes.string,
    destinationState: PropTypes.string,
    destinationPostalCode: PropTypes.string,
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

  getViewStripeChargeButton = () => {
    return (
      <ListItem icon last>
        <Left>
          <Icon name="card" />
        </Left>

        <Body>
          <Text>View on Stripe</Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  getRefundButton = () => {
    return (
      <ListItem last>
        <Body>
          <Text style={styles.danger}>Refund Order</Text>
        </Body>
      </ListItem>
    );
  };

  getContactSellerButton = () => {
    return (
      <ListItem last>
        <Body>
          <Text style={styles.primary}>Contact Seller</Text>
        </Body>
      </ListItem>
    );
  };

  getFormattedPrice = () => {
    return "$" + currency.format(this.props.amount, { format: "USD" });
  };

  getFormattedCreatedDate = () => {
    return moment(this.props.createdAt).format("MMMM D, YYYY [at] h:mm A");
  };

  render() {
    return (
      <List style={styles.list}>
        <ListItem itemDivider style={styles.divider} />

        {this.getDetailItem("Order", "#" + this.props.id)}
        {this.getDetailItem("Amount", this.getFormattedPrice())}
        {this.getDetailItem("Email", this.props.email)}
        {this.getDetailItem("Status", this.props.status)}
        {this.getDetailItem("Created", this.getFormattedCreatedDate())}

        <ListItem itemHeader>
          <Text style={styles.label}>Destination</Text>
        </ListItem>

        {this.getDetailItem("Name", this.props.destinationName)}
        {this.getDetailItem("Phone", this.props.destinationPhone)}
        {this.getDetailItem("Email", this.props.destinationEmail)}
        {this.getDetailItem("Address", `${this.props.destinationStreet1} ${this.props.destinationCity} ${this.props.destinationState}, ${this.props.destinationPostalCode}`, true)}

        <ListItem itemDivider style={styles.divider} />

        {this.getViewStripeChargeButton()}

        <ListItem itemDivider style={styles.divider} />

        {this.getContactSellerButton()}
        {this.getRefundButton()}
      </List>
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

export default OrderDetails;
