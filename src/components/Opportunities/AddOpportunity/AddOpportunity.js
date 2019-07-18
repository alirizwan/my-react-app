import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';

import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { setPercent, setAmount, setExpiresAt, setPrivate, resetForm } from '@cmp/redux/actions/opportunityForm';
import { createOpportunity } from '../mutations';
import { productOpportunities } from '../queries';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";
import { Container, Text, Button } from "native-base";

import AddOpportunityHeader from "./AddOpportunityHeader";
import AddOpportunityForm from "./AddOpportunityForm";

class AddOpportunity extends Component {
  static propTypes = {
    product: PropTypes.string,
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  componentWillMount() {
    this.props.onMount()
  };

  onSubmit = async () => {
    await this.props.createOpportunity({
      variables: {
        opportunity: {
          isPercentage: this.props.percent,
          visibility: this.props.private ? 'Private' : 'Public',
          amount: parseFloat(this.props.amount.replace('$', '')),
          expiresAt: moment(this.props.expiresAt).format('YYYY-MM-DD'),
          product: this.props.product
        }
      }
    });

    this.props.onSubmit && this.props.onSubmit();
  };

  onDismiss = () => {
    this.props.onDismiss && this.props.onDismiss();
    this.props.navigation && this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <AddOpportunityHeader
          onSubmit={this.onSubmit}
          onDismiss={this.onDismiss}
          isInModal={this.props.isInModal}
        />

        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <AddOpportunityForm
            {...this.props}
            onSubmit={this.onSubmit}
            onDismiss={this.onDismiss}
          />
        </KeyboardAwareScrollView>
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
  }
};

const mapStateToProps = (state) => ({
  ...state.opportunityForm
});

const mapDispatchToProps = (dispatch) => ({
  onPercentChange: e => dispatch(setPercent(e)),
  onAmountChange: e => dispatch(setAmount(e.nativeEvent.text)),
  onExpiresAtChange: e => dispatch(setExpiresAt(e)),
  onPrivateChange: e => dispatch(setPrivate(e)),
  onMount: _ => dispatch(resetForm())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(createOpportunity, {
    options: ({ product }) => ({
      refetchQueries: [{
        query: productOpportunities,
        variables: { product: product }
      }]
    }),
    name: 'createOpportunity'
  })
)(AddOpportunity);
