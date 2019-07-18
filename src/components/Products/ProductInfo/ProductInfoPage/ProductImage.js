import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

class ProductImage extends Component {
  static propTypes = {
    product: PropTypes.shape({
      image: PropTypes.string
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={{ uri: this.props.product.images[0].url }}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    position: "relative",
    height: 235,
    backgroundColor: "#f4f4f4"
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default ProductImage;
