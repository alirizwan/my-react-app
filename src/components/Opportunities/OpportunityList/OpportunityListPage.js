import React, { Component } from "react";
import { Container } from "native-base";

import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { productOpportunities } from '../queries';

import { Text } from 'react-native';
import AddOpportunityModal from '../AddOpportunity/AddOpportunityModal';
import OpportunityListHeader from "./OpportunityListHeader";
import OpportunityList from "./OpportunityList";

class OpportunityListPage extends Component {
  get hasActiveOpportunity() {
    return (
      this
        .props.data
        .products[0].opportunities
        .filter(o => o.isActive)
        .length > 0
    );
  };

  componentWillMount() {
    this.state = { addOpportunityVisible: false };
  }

  onAddOpportunity = () => {
    this.setState({ addOpportunityVisible: true });
  };

  onAddOpportunityDismiss = () => {
    this.setState({ addOpportunityVisible: false });
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onItemPress = opportunity => {
    const product = this.props.navigation.state.params.product;

    this.props.navigation.navigate(
      "OpportunityDetail",
      { opportunity, product }
    );
  };

  render() {
    const { loading, products } = this.props.data;
    const { networkStatus, refetch } = this.props.data;

    if (loading) {
      return (
        <Container>
          <OpportunityListHeader onDismiss={this.onDismiss} />
          <Text>Loading</Text>
        </Container>
      );
    } else {
      return (
        <Container>
          <OpportunityListHeader
            onAdd={this.onAddOpportunity}
            onDismiss={this.onDismiss}
            addVisible={!this.hasActiveOpportunity}
          />

          <AddOpportunityModal
            isVisible={this.state.addOpportunityVisible}
            onSubmit={this.onAddOpportunityDismiss}
            onDismiss={this.onAddOpportunityDismiss}
            product={this.props.navigation.state.params.product}
          />

          <OpportunityList
            opportunities={products[0].opportunities}
            isRefreshing={networkStatus === 4}
            onRefresh={refetch}
            onItemPress={this.onItemPress}
            onAddOpportunity={this.onAddOpportunity}
          />
        </Container>
      );
    }
  }
}

export default compose(
  graphql(productOpportunities, {
    options: ({ navigation }) => ({
      variables: { product: navigation.state.params.product }
    })
  })
)(OpportunityListPage);
