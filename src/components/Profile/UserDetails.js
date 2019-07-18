import React, { Component } from "react";
import PropTypes from "prop-types";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Form,
  Item,
  Text,
  Label,
  Input,
  ListItem,
  Body,
  Right,
  Icon,
  Button,
  View
} from "native-base";

class UserDetails extends Component {
  static propTypes = {
    isEditting: PropTypes.bool,
    isOwner: PropTypes.bool,

    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    originAddress: PropTypes.object,

    onNameChange: PropTypes.func,
    onUsernameChange: PropTypes.func,
    onEmailChange: PropTypes.func,
    onAddOriginAddress: PropTypes.func,
    onDeleteOriginAddress: PropTypes.func
  };

  showOriginAddress = () => {
    if (this.props.originAddress) {
      return (
        <View>
          <ListItem last>
            <Body>
              <Text style={styles.primary}>
                {this.props.originAddress.street1}
              </Text>
            </Body>
          </ListItem>

          <ListItem onPress={this.props.onDeleteOriginAddress} icon last>
            <Body>
              <Text style={styles.secondary}>Delete Address</Text>
            </Body>
          </ListItem>
        </View>
      );
    } else {
      return (
        <ListItem onPress={this.props.onAddOriginAddress} icon last>
          <Body>
            <Text style={styles.primary}>Add Origin Address</Text>
          </Body>
        </ListItem>
      );
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
        <Form style={styles.form}>
          <Item fixedLabel>
            <Label>Name</Label>
            <Input
              disabled={!this.props.isEditting}
              value={this.props.name}
              autoCorrect={false}
              onChange={this.props.onNameChange}
            />
          </Item>

          <Item fixedLabel>
            <Label>Username</Label>
            <Input
              disabled={!this.props.isEditting}
              value={this.props.username}
              autoCorrect={false}
              onChange={this.props.onUsernameChange}
            />
          </Item>

          <Item fixedLabel last>
            <Label>Email</Label>
            <Input
              disabled={true}
              value={this.props.email}
              autoCorrect={false}
              onChange={this.props.onEmailChange}
            />
          </Item>

          <ListItem itemDivider style={styles.divider}>
            <Text>Seller Info</Text>
          </ListItem>

          {this.showOriginAddress()}
        </Form>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  primary: {
    textAlign: "center",
    color: "#1abc9c"
  },

  secondary: {
    textAlign: "center",
    color: "#c0392b",
    fontWeight: "bold"
  },

  divider: {
    borderTopColor: "#dcdcdc",
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1
  },

  form: {
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  }
};

export default UserDetails;
