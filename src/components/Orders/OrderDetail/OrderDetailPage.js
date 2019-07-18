import React, { Component } from "react";
import { Container } from "native-base";
import { ScrollView } from "react-native";

import OrderDetailHeader from "./OrderDetailHeader";
import OrderDetails from "./OrderDetails";

import { connect } from "react-redux";
import { graphql } from "react-apollo";

class OrderDetailPage extends Component {
  getOrder = () => {
    return this.props.navigation.state.params.order;
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  render() {
    const order = this.getOrder();

    return (
      <Container style={styles.container}>
        <OrderDetailHeader onBack={this.onDismiss} />

        <ScrollView>
          <OrderDetails
            id={order.id}
            email={"replaceme@cmp.co"}
            amount={order.amount}
            createdAt={order.createdAt}
            status={order.status}
            destinationName={order.destination.name}
            destinationPhone={order.destination.phone}
            destinationEmail={order.destination.email}
            destinationStreet1={order.destination.street1}
            destinationCity={order.destination.city}
            destinationState={order.destination.state}
            destinationPostalCode={order.destination.postalCode}
          />
        </ScrollView>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4"
  },

  scrollView: {
    flex: 1
  }
};

const mapStateToProps = state => ({
  ...state.orderDetails
});

const mapActionsToProps = dispatch => ({

});

export default connect(mapStateToProps, mapActionsToProps)(OrderDetailPage);
