import React, { Component } from 'react';
import { Container, Icon } from 'native-base';
import { Text } from 'react-native';

class Messages extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="chatbubbles" style={{ color: tintColor }} />
  };

  render() {
    return (
      <Container>
        <Text>Messages</Text>
      </Container>
    )
  }
}

export default Messages;
