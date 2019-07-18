import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import { compose, graphql } from "react-apollo";
import { getProductById } from '../queries';
import styles from "../styles";

class Confirmation extends Component {

  static navigationOptions = {
    title: "Confirmation",
    headerStyle: styles.topHeader,
    headerBackTitleStyle: { display: 'none' }
  };

  onDismiss = () => {
    this.props.screenProps.onDismiss();
  };

	render() {
		return (
			<View style={styles.confirmationContainer}>
        <Image style={styles.check} source={require('./check.png')} />

        <Text style={styles.productName}>
          {this.props.data.products[0].name}
        </Text>
        <Text style={styles.hasBeenOrdered}>
          HAS BEEN ORDERED!
        </Text>
        <Text style={styles.email}>
          A confirmation email has been sent to you. The seller will send you tracking information separately.
        </Text>

        <Button
          style={styles.returnToProduct}
          title="Back to Product"
          onPress={this.onDismiss}
        />
			</View>
		);
	}
}

export default compose(
  graphql(getProductById, {
    options: ({ screenProps }) => ({
      variables: { product: screenProps.product }
    })
  })
)(Confirmation);
