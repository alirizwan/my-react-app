import React, { Component } from "react";
import PropTypes from "prop-types";

import { ScrollView, RefreshControl } from "react-native";
import { List } from "native-base";

import OrderListItem from "./OrderListItem";
import NoOrders from "./NoOrders";

class OrderList extends Component {
  static propTypes = {
    isRefreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onItemPress: PropTypes.func,
    onStartVideo: PropTypes.func,
    orders: PropTypes.array.isRequired
  };

  getRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
      />
    );
  };

  getOrderListItem = (order, i) => {
    return (
      <OrderListItem
        key={order.id}
        id={order.id}
        email={"replaceme@cmp.co"}
        amount={order.amount}
        createdAt={order.createdAt}
        onPress={_ => this.props.onItemPress(order)}
        isLast={this.props.orders.length >= i}
      />
    );
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.getRefreshControl()}
      >
        {this.props.orders.length === 0 &&
          <NoOrders onStartVideo={this.props.onStartVideo} />}

        <List style={styles.list}>
          {this.props.orders.map(this.getOrderListItem)}
        </List>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#f4f4f4"
  },
  list: {
    backgroundColor: "#fff"
  }
};

export default OrderList;
