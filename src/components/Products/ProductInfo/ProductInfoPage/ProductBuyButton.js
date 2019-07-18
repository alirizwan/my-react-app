import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

class ProductBuyButton extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number
    }),

    onPress: PropTypes.func
  };

  get buttonLabel() {
    const { name, price } = this.props.product;
    return `Buy for $${price}`.toUpperCase();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
          <Text style={styles.label}>
            {this.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    padding: 15
  },

  button: {
    padding: 17,
    backgroundColor: '#976CE0',
    borderRadius: 3
  },

  label: {
    fontFamily: 'Open Sans',
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
};

export default ProductBuyButton;
