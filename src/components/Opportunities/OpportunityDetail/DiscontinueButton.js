import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, ActionSheetIOS, Alert } from "react-native";
import { ListItem, Body, Text } from "native-base";

class DiscontinueButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  onConfirm = result => {
    if (result === undefined || result === 0) {
      this.props.onPress();
    }
  };

  onDelete = () => {
    const title = 'Discontinue opportunity?';

    const message = (
      'Once discontinued, anyone selling your product ' +
      'through this opportunity will no longer ' +
      'be able to make sales.'
    );

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Discontinue", "Cancel"],
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
        { text: "Discontinue", onPress: this.onConfirm }
      ]);
    }
  };

  render() {
    return (
      <ListItem onPress={this.onDelete} last>
        <Body>
          <Text style={styles.danger}>Discontinue Opportunity</Text>
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

export default DiscontinueButton;
