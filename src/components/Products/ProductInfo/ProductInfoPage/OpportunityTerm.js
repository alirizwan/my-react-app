import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class OpportunityTerm extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fixedWidth}>
          <Icon style={styles.icon} name={this.props.icon} />
        </View>

        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },

  fixedWidth: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon: {
    color: '#976CE0'
  },

  label: {
    color: '#976CE0',
    fontFamily: 'Open Sans',
    fontWeight: '500',
    fontSize: 15,
    flex: 1,
    paddingBottom: 4,
    marginLeft: 10
  }
};

export default OpportunityTerm;
