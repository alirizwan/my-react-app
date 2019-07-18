import React, {Component} from 'react';
import {Form, Input, Item} from "native-base";
import {setEmail, setFirstName, setLastName} from "@cmp/redux/actions/checkout";
import {Text} from "react-native";
import {connect} from "react-redux";

class ContactDetailsForm extends Component {
  render() {
    return (
      <Form style={styles.form}>
        <Item last>
          <Input
            placeholder="First Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.props.firstName}
            onChange={this.props.onFirstNameChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="Last Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.props.lastName}
            onChange={this.props.onLastNameChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.props.email}
            onChange={this.props.onEmailChange}
          />
        </Item>
      </Form>
    );
  }
}


const styles = {
  form: {
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  }
};

const mapStateToProps = (state) => ({
  ...state.checkout
});

const mapDispatchToProps = (dispatch) => ({
  onFirstNameChange: e => dispatch(setFirstName(e.nativeEvent.text)),
  onLastNameChange: e => dispatch(setLastName(e.nativeEvent.text)),
  onEmailChange: e => dispatch(setEmail(e.nativeEvent.text)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailsForm);
