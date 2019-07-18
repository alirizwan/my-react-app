import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, ListItem, Left, Right, Body, Text, Icon } from "native-base";
import currency from "currency-formatter";

import DeleteButton from "./DeleteButton";

class ProductDetails extends Component {
  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,

    onDelete: PropTypes.func,
    onViewOrders: PropTypes.func,
    onViewOpportunities: PropTypes.func
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

  getOrdersButton = () => {
    return (
      <ListItem onPress={this.props.onViewOrders} icon>
        <Left>
          <Icon name="basket" />
        </Left>

        <Body>
          <Text>Orders</Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  getOpportunitiesButton = () => {
    return (
      <ListItem onPress={this.props.onViewOpportunities} icon last>
        <Left>
          <Icon name="megaphone" />
        </Left>

        <Body>
          <Text>Opportunities</Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  getFormattedPrice = () => {
    return "$" + currency.format(this.props.price, { format: "USD" });
  };

  render() {
    return (
      <List style={styles.list}>
        {this.getDetailItem("Name", this.props.name)}
        {this.getDetailItem("Price", this.getFormattedPrice(), true)}

        <ListItem itemDivider style={styles.divider} />

        <ListItem last>
          <Body>
            <Text>
              {this.props.description}
            </Text>
          </Body>
        </ListItem>

        <ListItem itemDivider style={styles.divider} />

        {this.getOrdersButton()}
        {this.getOpportunitiesButton()}

        <ListItem itemDivider style={styles.divider} />

        <DeleteButton
          productName={this.props.name}
          onPress={this.props.onDelete}
        />

        <ListItem itemDivider style={styles.lastDivider} />
      </List>
    );
  }
}

const styles = {
  left: {
    flex: 0,
    width: 120
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

export default ProductDetails;
