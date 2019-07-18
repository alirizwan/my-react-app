import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, ActionSheetIOS, Alert } from "react-native";
import { ListItem, Body, Text } from "native-base";

class DeleteButton extends Component {
  static propTypes = {
    productName: PropTypes.string,
    onPress: PropTypes.func
  };

  onConfirm = result => {
    if (result === undefined || result === 0) {
      this.props.onPress();
    }
  };

  onDelete = () => {
    const title = `Delete ${this.props.productName}?`;
    const message = `Are you sure you want to delete ${this.props
      .productName}? This action cannot be undone.`;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Delete", "Cancel"],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
          title: title,
          message: message
        },
        this.onConfirm
      );
    } else {
      Alert.alert(title, message, [
        { text: "Cancel" },
        { text: "Delete", onPress: this.onConfirm }
      ]);
    }
  };

  render() {
    return (
      <ListItem onPress={this.onDelete} last>
        <Body>
          <Text style={styles.danger}>Delete Product</Text>
        </Body>
      </ListItem>
    );
  }
}

const styles = {
  danger: {
    textAlign: "center",
    color: "#e74c3c"
  }
};

export default DeleteButton;
