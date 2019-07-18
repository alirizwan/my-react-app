import React, { Component } from "react";
import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";
import {
  Body,
  Left,
  Right,
  Button,
  Title,
  Text,
  Header,
  Icon
} from "native-base";

class PhotoViewerHeader extends Component {
  static propTypes = {
    onBack: PropTypes.func,
    shareAllowed: PropTypes.bool,
    onSharePress: PropTypes.func,
    onPrintPress: PropTypes.func,
    title: PropTypes.string
  };

  onSharePress = () => {
    Platform.OS === "ios"
      ? this.props.onSharePress()
      : this.getShareOrPrintAlert();
  };

  getShareOrPrintAlert = () => {
    Alert.alert(
      "",
      "Would you like to print or share the image?",
      [
        { text: "Print", onPress: this.props.onPrintPress },
        { text: "Share", onPress: this.props.onSharePress },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  getShareButton = () => {
    return (
      <Button transparent onPress={this.onSharePress}>
        <Icon style={styles.content} name="share" />
      </Button>
    );
  };

  render() {
    return (
      <Header>
        <Left>
          <Button onPress={this.props.onBack} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>

        <Body>
          <Title>
            {this.props.title.toUpperCase()}
          </Title>
        </Body>

        <Right>

        </Right>
      </Header>
    );
  }
}

export default PhotoViewerHeader;
