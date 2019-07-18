import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class ProductNameAndPrice extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {this.props.product.name}
        </Text>

        <Text style={styles.price}>
          ${this.props.product.price} | SOLD BY {this.props.product.owner.name.toUpperCase()}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1
  },

  name: {
    fontFamily: 'Montserrat',
    fontSize: 21,
    fontWeight: '400',
    letterSpacing: 1.5,
    marginBottom: 3
  },

  price: {
    fontFamily: 'Open Sans',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#976CE0',
    marginTop: 3
  }
};

export default ProductNameAndPrice;
