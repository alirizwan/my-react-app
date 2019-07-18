import React, { Component } from 'react';
import { Container, Icon } from 'native-base';
import { Text } from 'react-native';

class Explore extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="globe" style={{ color: tintColor }} />
  };

  render() {
    return (
      <Container><Text>Explore</Text></Container>
    )
  }
}

export default Explore;
