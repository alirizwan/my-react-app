import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";

class ProductListItemUser extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.user}>
        <Image style={styles.image} source={{ uri: this.props.picture }} />

        <View style={styles.info}>
          <Text style={styles.name}>
            {this.props.name}
          </Text>
          <Text style={styles.price}>
            {this.props.price}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  user: {
    flexDirection: "row",
    backgroundColor: "transparent"
  },

  image: {
    width: 36,
    height: 36,
    borderColor: "#fff",
    borderRadius: 3,
    borderWidth: 2
  },

  name: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold"
  },

  price: {
    color: "#FFF",
    fontSize: 16
  },

  info: {
    marginLeft: 10
  }
};

export default ProductListItemUser;
