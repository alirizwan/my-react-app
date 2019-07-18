import React, { Component } from "react";
import PropTypes from "prop-types";

import { ScrollView, RefreshControl } from "react-native";
import { List, ListItem, Text } from "native-base";

import NoOpportunities from './NoOpportunities';
import OpportunityListItem from "./OpportunityListItem";

class OpportunityList extends Component {
  static propTypes = {
    isRefreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onItemPress: PropTypes.func,
    onAddOpportunity: PropTypes.func,
    opportunities: PropTypes.array.isRequired
  };

  getRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
      />
    );
  };

  getOpportunityListItem = (opportunity, i) => {
    return (
      <OpportunityListItem
        key={opportunity.id}
        {...opportunity}
        isLast={this.props.opportunities.length >= i}
        onPress={_ => this.props.onItemPress(opportunity)}
      />
    );
  };

  get activeHeader() {
    return (
      this.activeOpportunities.length > 0 && (
        <ListItem itemHeader first>
          <Text>CURRENTLY ACTIVE OPPORTUNITY</Text>
        </ListItem>
      )
    );
  };

  get inactiveHeader() {
    return (
      this.inactiveOpportunities.length > 0 && (
        <ListItem itemHeader>
          <Text>INACTIVE OPPORTUNITIES</Text>
        </ListItem>
      )
    );
  };

  get activeOpportunities() {
    return this.props.opportunities.filter(o => o.isActive);
  };

  get inactiveOpportunities() {
    return this.props.opportunities.filter(o => !o.isActive);
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.getRefreshControl()}
      >
        {this.props.opportunities.length === 0 &&
          <NoOpportunities onAddOpportunity={this.props.onAddOpportunity} />}

        <List style={styles.list}>
          {this.activeHeader}
          {this.activeOpportunities.map(this.getOpportunityListItem)}

          {this.inactiveHeader}
          {this.inactiveOpportunities.map(this.getOpportunityListItem)}
        </List>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#f4f4f4"
  },
  list: {
    backgroundColor: "#fff"
  }
};

export default OpportunityList;
