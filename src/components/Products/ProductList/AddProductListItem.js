import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View } from "react-native";
import { Icon } from "native-base";

class AddProductListItem extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    const styles = {
      item: {
        borderRadius: 3,
        borderWidth: 3,
        borderStyle: "dashed",
        borderColor: "#ccc",

        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        padding: 10,
        height: 120,
        marginBottom: 30
      },

      text: {
        color: "#777",
        fontWeight: "bold",
        marginLeft: 15,
        marginBottom: 3
      },

      icon: {
        color: "#777"
      }
    };

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.item}>
          <Icon style={styles.icon} name="add" />
          <Text style={styles.text}>New Product</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AddProductListItem;
