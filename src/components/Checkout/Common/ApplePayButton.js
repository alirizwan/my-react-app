import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Text, Icon } from "native-base";

class ApplePayButton extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    return (
      <Button light style={styles.button} onPress={this.props.onPress}>
        <Text>Buy with </Text>
        <Icon name="logo-apple" />
        <Text>Pay</Text>
      </Button>
    )
  }
}

const styles = {
  button: {
    borderColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
}

export default ApplePayButton;
