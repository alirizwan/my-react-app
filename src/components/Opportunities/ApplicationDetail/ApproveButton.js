import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, ActionSheetIOS, Alert } from "react-native";
import { ListItem, Body, Text } from "native-base";

class ApproveButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  onConfirm = result => {
    if (result === undefined || result === 0) {
      this.props.onPress();
    }
  };

  onApprove = () => {
    const title = 'Approve application?';

    const message = (
      'The applicant will be notified and will be ' +
      'able to sell your product.'
    );

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Approve", "Cancel"],
          cancelButtonIndex: 1,
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
      <ListItem onPress={this.onApprove} last>
        <Body>
          <Text style={styles.primary}>Approve Application</Text>
        </Body>
      </ListItem>
    );
  }
}

const styles = {
  primary: {
    textAlign: "center",
    color: "#1abc9c"
  }
};

export default ApproveButton;
