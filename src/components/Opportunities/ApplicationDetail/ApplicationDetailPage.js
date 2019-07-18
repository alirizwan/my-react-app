import React, { Component } from "react";
import { Container } from "native-base";
import { ScrollView, Alert } from "react-native";

import ApplicationDetailHeader from "./ApplicationDetailHeader";
import ApplicationDetails from "./ApplicationDetails";

import { compose, graphql } from "react-apollo";
import { approveApplication, rejectApplication } from '../mutations';
import { productOpportunities } from '../queries';
import moment from 'moment';

class ApplicationDetailPage extends Component {
  get opportunity() {
    return this.props.navigation.state.params.opportunity;
  };

  get application() {
    return this.props.navigation.state.params.application;
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onApprove = async () => {
    await this.props.approveApplication({ variables: { id: this.application.id } });
    this.props.navigation.goBack();
  };

  onReject = async () => {
    await this.props.rejectApplication({ variables: { id: this.application.id } });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container style={styles.container}>
        <ApplicationDetailHeader
          onBack={this.onDismiss}
        />

        <ScrollView>
          <ApplicationDetails
            {...this.application}
            onApprove={this.onApprove}
            onReject={this.onReject}
          />
        </ScrollView>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4"
  },

  scrollView: {
    flex: 1
  }
};

export default compose(
  graphql(approveApplication, {
    options: ({ navigation }) => ({
      refetchQueries: [{
        query: productOpportunities,
        variables: { product: navigation.state.params.product }
      }]
    }),
    name: 'approveApplication'
  }),
  graphql(rejectApplication, {
    options: ({ navigation }) => ({
      refetchQueries: [{
        query: productOpportunities,
        variables: { product: navigation.state.params.product }
      }]
    }),
    name: 'rejectApplication'
  })
)(ApplicationDetailPage);
