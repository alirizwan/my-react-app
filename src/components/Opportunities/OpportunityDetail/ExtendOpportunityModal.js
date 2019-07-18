import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Picker, Item, View, Text, Modal } from 'react-native';
import { Header, Left, Right, Body, Title, Button } from 'native-base';

class ExtendOpportunityModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onChange: PropTypes.func
  };

  componentWillMount() {
    this.state = { value: "1" };
  }

  onSubmit = () => {
    this.props.onChange && this.props.onChange(this.state.value);
    this.props.onRequestClose && this.props.onRequestClose();
  };

  onDismiss = () => {
    this.props.onRequestClose && this.props.onRequestClose();
  };

  render() {
    return (
      <Modal animationType="slide" {...this.props}>
        <View>
          <Header>
            <Left>
              <Button onPress={this.onDismiss} transparent>
                <Text>Cancel</Text>
              </Button>
            </Left>

            <Body>
              <Title>
                Extend Opportunity
              </Title>
            </Body>

            <Right>
              <Button onPress={this.onSubmit} transparent>
                <Text>Extend</Text>
              </Button>
            </Right>
          </Header>

          <Text style={styles.text}>
            How long do you want to extend the opportunity?
          </Text>

          <Picker
            style={styles.picker}
            selectedValue={this.state.value}
            onValueChange={(value) => this.setState({ value })}>
            <Picker.Item label="1 Month" value="1" />
            <Picker.Item label="2 Months" value="2" />
            <Picker.Item label="3 Months" value="3" />
            <Picker.Item label="6 Months" value="6" />
            <Picker.Item label="12 Months" value="12" />
          </Picker>
        </View>
      </Modal>
    )
  }
}

const styles = {
  title: {
    width: 200
  },

  text: {
    margin: 20,
    marginTop: 60,
    fontSize: 14,
    textAlign: 'center'
  },

  picker: {
    marginTop: -50
  }
};

export default ExtendOpportunityModal;
