import React, { Component } from "react";
import PropTypes from "prop-types";

import { Item, Input, Icon, Label } from "native-base";
import { StyleSheet } from "react-native";

class ErrorTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    bold: PropTypes.bool,

    labelType: PropTypes.string,
    last: PropTypes.bool,

    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    selectTextOnFocus: PropTypes.bool
  };

  getInputLabel = () => {
    const labelStyle = Object.assign(
      {},
      {
        fontWeight: this.props.bold ? "bold" : "normal"
      }
    );

    return (
      <Label style={labelStyle}>
        {this.props.label}
      </Label>
    );
  };

  render() {
    const itemProps = {
      [this.props.labelType]: true,
      last: this.props.last,
      error: true
    };

    return (
      <Item {...itemProps}>
        {this.props.label && this.getInputLabel()}
        <Input
          placeholder={this.props.placeholder}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
          value={this.props.value}
          onChange={this.props.onChange}
          selectTextOnFocus={this.props.selectTextOnFocus}
        />
        <Icon name="close-circle" />
      </Item>
    );
  }
}

export default ErrorTextInput;
