import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class ProductDescription extends Component {
  static propTypes = {
    product: PropTypes.shape({
      description: PropTypes.string
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          {this.props.product.description}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1
  },

  description: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Montserrat',
    color: '#777777',
    lineHeight: 28,
    margin: 0,
    padding: 0
  }
};

export default ProductDescription;
