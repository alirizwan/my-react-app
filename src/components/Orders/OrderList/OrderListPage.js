import React, { Component } from "react";
import { Container } from "native-base";

import { setProduct } from '@cmp/redux/actions/video';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { getProductOrders } from '../queries';

import OrderListHeader from "./OrderListHeader";
import OrderList from "./OrderList";

class OrderListPage extends Component {
  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onItemPress = order => {
    this.props.navigation.navigate("OrderDetail", { order: order });
  };

  onStartVideo = () => {
    this.props.onGoLive(this.props.data.products[0]);

    this.props.screenProps.rootNavigation.navigate("Video");
  };

  render() {
    const { products, networkStatus, refetch } = this.props.data;
    const orders = (products && products[0].orders) || [];

    return (
      <Container>
        <OrderListHeader onDismiss={this.onDismiss} />

        <OrderList
          orders={orders}
          isRefreshing={networkStatus === 4}
          onRefresh={refetch}
          onItemPress={this.onItemPress}
          onStartVideo={this.onStartVideo}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapActionsToProps = dispatch => ({
  onGoLive: product => dispatch(setProduct(product))
});

const getProductOrdersQuery = graphql(getProductOrders, {
  options: props => ({
    variables: { id: props.navigation.state.params.product }
  })
});

export default compose(getProductOrdersQuery)(
  connect(mapStateToProps, mapActionsToProps)(OrderListPage)
);
