import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';

class PartnerWithProductButton extends Component {
  static propTypes = {
    private: PropTypes.bool
  };

  get buttonLabel() {
    return (
      (this.props.private)
        ? 'Send Application'.toUpperCase()
        : 'Accept Terms and Partner'.toUpperCase()
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onClick} style={styles.button}>
          <Text style={styles.label}>
            {this.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    padding: 15
  },

  button: {
    padding: 17,
    backgroundColor: '#976CE0',
    borderRadius: 3
  },

  label: {
    fontFamily: 'Open Sans',
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
};

export default PartnerWithProductButton;
