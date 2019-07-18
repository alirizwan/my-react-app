import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, KeyboardAvoidingView } from "react-native";
import { Container, Button, Text } from "native-base";

import { connect } from "react-redux";

import {
  setEmail,
  sendEmail,
  resetForm
} from "@zipline/redux/actions/forgotPasswordForm";

import BottomActionButton from "../Common/BottomActionButton";
import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

class ForgotPassword extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit();
  };

  onDismiss = () => {
    this.props.onDismiss && this.props.onDismiss();
    this.props.navigation && this.props.navigation.goBack();
  };

  showSendEmailForm = () => {
    return (
      !this.props.isEmailSent &&
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ForgotPasswordForm
          email={this.props.email}
          onEmailChange={this.props.onEmailChange}
        />

        <BottomActionButton
          label="Reset Password"
          disabled={!this.props.isSendEmailEnabled}
          onPress={this.props.onSendEmail}
        />
      </KeyboardAvoidingView>
    );
  };
  showCheckEmail = () => {
    return (
      this.props.isEmailSent &&
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>
          Check your email to reset your password
        </Text>

        <Button style={styles.alertButton} onPress={this.onSubmit}>
          <Text style={styles.alertButtonText}>Done</Text>
        </Button>
      </View>
    );
  };

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Container>
        <ForgotPasswordHeader
          onSubmit={this.onSubmit}
          onDismiss={this.onDismiss}
          isInModal={this.props.isInModal}
        />

        {this.showSendEmailForm() || this.showCheckEmail()}
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4",
    borderRadius: 3
  },

  alertContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
    justifyContent: "center"
  },

  alertText: {
    paddingBottom: 15,
    alignSelf: "center",
    fontSize: 20,
    width: 200,
    textAlign: "center"
  },

  alertButton: {
    alignSelf: "center",
    borderRadius: 0,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#16a085"
  },

  alertButtonText: {
    fontWeight: "bold",
    color: "#1abc9c"
  }
};

const mapStateToProps = state => ({
  ...state.forgotPasswordForm
});

const mapActionsToProps = dispatch => ({
  onEmailChange: e => dispatch(setEmail(e.nativeEvent.text)),
  onSendEmail: _ => dispatch(sendEmail()),
  onMount: _ => dispatch(resetForm())
});

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
