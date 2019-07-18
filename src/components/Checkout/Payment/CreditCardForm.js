import React, {Component} from 'react';
import {Form, Input, Item} from "native-base";
import {setCardholderName, setCardNumber, setCvv, setExpirationDate} from "redux/actions/checkout";
import {connect} from "react-redux";

class CreditCardForm extends Component {
	render() {
		return (
      <Form style={styles.form}>
        <Item last>
          <Input
            placeholder="Card Number"
            keyboardType="numeric"
            value={this.props.cardNumber}
            onChange={this.props.onCardNumberChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="Expiration Date"
            keyboardType="numeric"
            value={this.props.expirationDate}
            onChange={this.props.onExpirationDateChange}
          />

          <Input
            placeholder="CVV"
            keyboardType="numeric"
            value={this.props.cvv}
            onChange={this.props.onCvvChange}
          />
        </Item>

        <Item last>
          <Input
            placeholder="Cardholder Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.props.cardholderName}
            onChange={this.props.onCardholderNameChange}
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
  onCardNumberChange: e => dispatch(setCardNumber(e.nativeEvent.text)),
  onExpirationDateChange: e => dispatch(setExpirationDate(e.nativeEvent.text)),
  onCvvChange: e => dispatch(setCvv(e.nativeEvent.text)),
  onCardholderNameChange: e => dispatch(setCardholderName(e.nativeEvent.text)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardForm);
