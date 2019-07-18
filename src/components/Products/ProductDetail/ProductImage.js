import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";

class ProductImage extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={this.props.source}
          style={styles.image}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    position: "relative",
    height: 200,
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D5DC"
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
