import React, { Component } from "react";
import { Container } from "native-base";
import { ScrollView, Alert } from "react-native";

import OpportunityDetailHeader from "./OpportunityDetailHeader";
import OpportunityDetails from "./OpportunityDetails";
import ExtendOpportunityModal from "./ExtendOpportunityModal";

import { compose, graphql } from "react-apollo";
import { discontinueOpportunity, extendOpportunity } from '../mutations';
import { productOpportunities } from '../queries';
import moment from 'moment';

class OpportunityDetailPage extends Component {
  componentWillMount() {
    this.state = { extendVisible: false };
  }

  get opportunity() {
    return this.props.navigation.state.params.opportunity;
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onShowExtend = () => {
    this.setState({ extendVisible: true });
  };

  onHideExtend = () => {
    this.setState({ extendVisible: false });
  };

  onExtend = async (months) => {
    const newDate = (
      moment(this.opportunity.expiresAt)
        .add(parseInt(months), 'months')
        .format('MMMM DD, YYYY')
    );

    await this.props.extendOpportunity({
      variables: {
        id: this.opportunity.id,
        opportunity: {
          expiresAt: newDate
        }
      }
    });
  };

  onDiscontinue = async () => {
    await this.props.discontinueOpportunity({
      variables: {
        id: this.opportunity.id,
        opportunity: {
          isDiscontinued: true
        }
      }
    });

    this.onDismiss();
  };

  onApplicationsPress = () => {
    const product = this.props.navigation.state.params.product;
    const opportunity = this.props.navigation.state.params.opportunity;
    this.props.navigation.navigate(
      "ApplicationsList", { product, opportunity} );
  };

  render() {
    return (
      <Container style={styles.container}>
        <ExtendOpportunityModal
          visible={this.state.extendVisible}
          onRequestClose={this.onHideExtend}
          onChange={this.onExtend}
        />

        <OpportunityDetailHeader
          onBack={this.onDismiss}
        />

        <ScrollView>
          <OpportunityDetails
            {...this.opportunity}
            onExtend={this.onShowExtend}
            onDiscontinue={this.onDiscontinue}
            onApplicationsPress={this.onApplicationsPress}
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
  graphql(discontinueOpportunity, {
    options: ({ navigation }) => ({
      refetchQueries: [{
        query: productOpportunities,
        variables: { product: navigation.state.params.product }
      }]
    }),
    name: 'discontinueOpportunity'
  }),
  graphql(extendOpportunity, {
    options: ({ navigation }) => ({
      refetchQueries: [{
        query: productOpportunities,
        variables: { product: navigation.state.params.product }
      }]
    }),
    name: 'extendOpportunity'
  })
)(OpportunityDetailPage);
