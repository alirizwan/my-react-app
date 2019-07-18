import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, View, Text } from "react-native";

class ActiveProduct extends Component {
  static propTypes = {
    product: PropTypes.object,
    onPress: PropTypes.func
  };

  getSelectedProduct = product =>
    <TouchableOpacity onPress={this.props.onPress} style={styles.highlight}>
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.product.images[0].url }}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>
            {this.props.product.name}
          </Text>

          <Text style={styles.price}>
            ${this.props.product.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>;

  getChooseProduct = () =>
    <TouchableOpacity onPress={this.props.onPress} style={styles.highlight}>
      <View style={[styles.container, styles.chooseProduct]}>
        <Text style={styles.name}>Choose a Product</Text>
      </View>
    </TouchableOpacity>;

  render() {
    return this.props.product
      ? this.getSelectedProduct()
      : this.getChooseProduct();
  }
}

const styles = {
  highlight: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0
  },

  container: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,

    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 3,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center"
  },

  chooseProduct: {
    padding: 20
  },

  name: {
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  price: {
    color: "#fff",
    textShadowColor: "#777",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },

  info: {
    flex: 1,
    marginLeft: 10
  },

  image: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#fff",
    width: 36,
    height: 36
  }
};

export default ActiveProduct;
