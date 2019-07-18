import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity } from "react-native";
import { View, Button, Text } from "native-base";

class ProductDetailBar extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          height: PropTypes.number,
          width: PropTypes.number,
        })
      ),
    }).isRequired,
    onShowDetails: PropTypes.func.isRequired,
    onBuy: PropTypes.func,
  };

  render() {
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onShowDetails}>
        <Image
          source={{uri: this.props.product.images[0].url}}
          style={styles.productImage}
        />

        <View style={styles.nameAndCategory}>
          <Text style={styles.name}>{this.props.product.name}</Text>
          <Text style={styles.category}>LIFESTYLE</Text>
        </View>

        <Button light style={styles.buyButton} onPress={this.props.onBuy}>
          <Text style={styles.buttonText}>Buy</Text>
        </Button>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#d6d6d6',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },

  productImage: {
    height: 60,
    width: 60
  },

  nameAndCategory: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center'
  },

  category: {
    paddingTop: 2,
    color: '#9b59b6'
  },

  buyButton: {
    borderColor: '#9b59b6',
    borderWidth: 1,
    height: 30,
    alignSelf: 'center'
  },

  buttonText: {
    color: '#9b59b6',
  }

};

export default ProductDetailBar;
