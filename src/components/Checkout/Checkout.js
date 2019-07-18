import React, {Component} from 'react';
import {Text} from "react-native";
import {StackNavigator} from "react-navigation";
import Payment from "./Payment/Payment";
import Information from "./Information/Information";
import Confirmation from "./Confirmation/Confirmation";
import {StatusBar} from "react-native";

class Checkout extends Component {

  getRoutes() {
    return {
      Payment: { screen: Payment, path: "payment" },
      Information: { screen: Information, path: "information" },
      Confirmation: { screen: Confirmation, path: "confirmation" }
    };
  }

  getOptions() {
    return {
      initialRouteName: "Payment",
      headerMode: 'none',
      cardStyle: { backgroundColor: "#fff" }
    };
  }

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  render() {
    StatusBar.setBarStyle("dark-content");

    const screenProps = { ...this.props.screenProps, onDismiss: this.onDismiss };
    const Navigation = StackNavigator(this.getRoutes(), this.getOptions());
    return <Navigation screenProps={screenProps}  />;
  }
}

export default Checkout;
