import React, { Component } from "react";
import PropTypes from "prop-types";

import { AsyncStorage, View, KeyboardAvoidingView } from "react-native";
import { Container, Button, Text } from "native-base";

import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import { deleteAccountById } from './mutations';

import { setUsername, setPassword, login, resetForm } from '@cmp/redux/actions/loginForm';
import { showCreateAccount, hideCreateAccount } from '@cmp/redux/actions/loginForm';
import { showForgotPassword, hideForgotPassword } from '@cmp/redux/actions/loginForm';

import BottomActionButton from "./Common/BottomActionButton";
import AdditionalOptionsBar from "./Common/AdditionalOptionsBar";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

import CreateAccountModal from "./CreateAccount/CreateAccountModal";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";

class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit();
    this.props.onLogin(this.onComplete);
  };

  onDismiss = () => {
    this.props.onDismissForgotPassword();
    this.props.onDismissCreateAccount();
    this.props.onDismiss && this.props.onDismiss();
    this.props.navigation && this.props.navigation.goBack();
  };

  onComplete = async () => {
    await this.props.deleteAccount({ variables: { id: this.props.anonymousUserId } });
    this.onDismiss();
  };

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Container>
        <CreateAccountModal
          isVisible={this.props.isCreateAccountVisible}
          onDismiss={this.props.onDismissCreateAccount}
          onSubmit={this.onDismiss}
        />

        <ForgotPasswordModal
          isVisible={this.props.isForgotPasswordVisible}
          onDismiss={this.props.onDismissForgotPassword}
          onSubmit={this.onDismiss}
        />

        <LoginHeader
          onSubmit={this.onSubmit}
          onDismiss={this.onDismiss}
          isInModal={this.props.isInModal}
        />

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <LoginForm
            username={this.props.username}
            password={this.props.password}
            onUsernameChange={this.props.onUsernameChange}
            onPasswordChange={this.props.onPasswordChange}
          />

          <View>
            <BottomActionButton
              label="Sign In"
              disabled={!this.props.isLoginEnabled}
              onPress={this.onSubmit}
            />

            <AdditionalOptionsBar
              onCreateAccount={this.props.onCreateAccount}
              onForgotPassword={this.props.onForgotPassword}
            />
          </View>
        </KeyboardAvoidingView>
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
  ...state.loginForm,
  anonymousUserId: state.account.id
});

const mapActionsToProps = dispatch => ({
  onUsernameChange: e => dispatch(setUsername(e.nativeEvent.text)),
  onPasswordChange: e => dispatch(setPassword(e.nativeEvent.text)),
  onLogin: (onComplete) => dispatch(login(onComplete)),

  onCreateAccount: _ => dispatch(showCreateAccount()),
  onDismissCreateAccount: _ => dispatch(hideCreateAccount()),

  onForgotPassword: _ => dispatch(showForgotPassword()),
  onDismissForgotPassword: _ => dispatch(hideForgotPassword()),

  onMount: _ => dispatch(resetForm())
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  graphql(deleteAccountById, { name: 'deleteAccount'})
)(Login);
