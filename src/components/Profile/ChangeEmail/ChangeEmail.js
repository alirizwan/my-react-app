import React, { Component } from "react";
import PropTypes from "prop-types";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeEmailHeader from "./ChangeEmailHeader";
import { Keyboard } from "react-native";
import { connect } from "react-redux";
import { Container } from "native-base";
import {
  setEmail,
  changeEmail,
  resetForm
} from "../../actions/changeEmailForm";

class ChangeEmail extends Component {
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

  componentWillMount = () => {
    this.props.onMount();
  };
  render() {
    return (
      <Container>
        <ChangeEmailHeader
          isInModal={this.props.isInModal}
          onSubmit={this.props.onSubmit}
          onDismiss={this.onDismiss}
        />
        <ChangeEmailForm
          email={this.props.email}
          onEmailChange={this.props.onEmailChange}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  ...state.changeEmailForm
});

const mapActionsToProps = dispatch => ({
  onDone: _ => dispatch(submitForm()),
  onEdit: _ => dispatch(toggleEditting()),

  onEmailChange: e => dispatch(setEmail(e.nativeEvent.text)),
  onSubmit: _ => dispatch(changeEmail()),

  onMount: _ => dispatch(resetForm())
});

export default connect(mapStateToProps, mapActionsToProps)(ChangeEmail);
