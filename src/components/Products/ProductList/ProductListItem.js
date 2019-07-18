import React, { Component } from "react";
import PropTypes from "prop-types";

import { TouchableOpacity, View, Image, Text } from "react-native";
import { Icon } from "native-base";

import Scrim from "../../Common/Scrim";
import ProductListItemUser from "./ProductListItemUser";

class ProductListItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.object
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={Object.assign({}, styles.item, this.props.style)}
          onPress={this.props.onPress}
        >
          <Image
            style={styles.image}
            source={{ uri: this.props.image }}
            resizeMode="cover"
          />

          <Scrim style={styles.linearGradient}>
            <Text style={styles.name}>
              {this.props.name}
            </Text>

            <ProductListItemUser
              name={this.props.ownerName}
              price={"$" + this.props.price}
              picture={this.props.ownerPicture}
            />
          </Scrim>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  item: {
    borderRadius: 3,
    backgroundColor: "#333",
    marginBottom: 15,
    position: "relative",
    height: 120
  },

  name: {
    color: "#FFF",
    fontWeight: "bold",
    flex: 1,
    backgroundColor: "transparent"
  },

  image: {
    borderRadius: 3,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  linearGradient: {
    flex: 1,
    borderRadius: 3,
    padding: 10
  }
};

export default ProductListItem;
