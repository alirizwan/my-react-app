import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, KeyboardAvoidingView } from "react-native";
import { Container, Text, Button } from "native-base";
import { deleteAccountById } from "../mutations";

import {
  setFirstName,
  setLastName,
  setEmail,
  setUsername,
  setPassword,
  createAccount,
  resetForm
} from "@cmp/redux/actions/createAccountForm";

import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";

import BottomActionButton from "../Common/BottomActionButton";
import CreateAccountHeader from "./CreateAccountHeader";
import CreateAccountForm from "./CreateAccountForm";

class CreateAccount extends Component {
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

  onComplete = async () => {
    await this.props.deleteAccount({ variables: { id: this.props.anonymousUserId } });
  };

  componentWillMount() {
    this.props.onMount();
  }

  showCreateAccountForm = () => {
    return (
      !this.props.createdAccount &&
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <CreateAccountForm
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          email={this.props.email}
          username={this.props.username}
          password={this.props.password}
          onFirstNameChange={this.props.onFirstNameChange}
          onLastNameChange={this.props.onLastNameChange}
          onEmailChange={this.props.onEmailChange}
          onUsernameChange={this.props.onUsernameChange}
          onPasswordChange={this.props.onPasswordChange}
        />

        <BottomActionButton
          label="Create Account"
          disabled={!this.props.isCreateAccountEnabled}
          onPress={_ => this.props.onCreateAccount(this.onComplete)}
        />
      </KeyboardAvoidingView>
    );
  };

  showVerifyEmail = () => {
    return (
      this.props.createdAccount &&
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>
          Check your email to verify your account
        </Text>

        <Button style={styles.alertButton} onPress={this.onSubmit}>
          <Text style={styles.alertButtonText}>Done</Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <Container>
        <CreateAccountHeader
          onSubmit={this.onSubmit}
          onDismiss={this.onDismiss}
          isInModal={this.props.isInModal}
        />

        {this.showCreateAccountForm() || this.showVerifyEmail()}
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f4f4f4"
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
  ...state.createAccountForm,
  anonymousUserId: state.account.id
});

const mapActionsToProps = dispatch => ({
  onFirstNameChange: e => dispatch(setFirstName(e.nativeEvent.text)),
  onLastNameChange: e => dispatch(setLastName(e.nativeEvent.text)),
  onEmailChange: e => dispatch(setEmail(e.nativeEvent.text)),
  onUsernameChange: e => dispatch(setUsername(e.nativeEvent.text)),
  onPasswordChange: e => dispatch(setPassword(e.nativeEvent.text)),
  onCreateAccount: onComplete => dispatch(createAccount(onComplete)),
  onMount: _ => dispatch(resetForm())
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  graphql(deleteAccountById, { name: 'deleteAccount'})
)(CreateAccount);
