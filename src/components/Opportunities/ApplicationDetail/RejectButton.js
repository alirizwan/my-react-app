import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, ActionSheetIOS, Alert } from "react-native";
import { ListItem, Body, Text } from "native-base";

class RejectButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  onConfirm = result => {
    if (result === undefined || result === 0) {
      this.props.onPress();
    }
  };

  onReject = () => {
    const title = 'Reject application?';

    const message = (
      'The applicant will not be able to sell your product.'
    );

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Reject", "Cancel"],
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
        { text: "Approve", onPress: this.onConfirm }
      ]);
    }
  };

  render() {
    return (
      <ListItem onPress={this.onReject} last>
        <Body>
          <Text style={styles.danger}>Reject Application</Text>
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

export default RejectButton;
