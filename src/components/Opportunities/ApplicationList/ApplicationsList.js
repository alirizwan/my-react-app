import React, { Component } from "react";
import PropTypes from "prop-types";

import { ScrollView } from "react-native";
import { List, ListItem } from "native-base";

import ApplicationsListItem from "./ApplicationsListItem";

class ApplicationsList extends Component {
  static propTypes = {
    onItemPress: PropTypes.func,
    applications: PropTypes.array.isRequired
  };

  getApplicationsListItem = (application, i) => {
    return (
      <ApplicationsListItem
        key={application.id}
        {...application}
        isLast={this.props.applications.length >= i}
        onPress={_ => this.props.onItemPress(application)}
      />
    );
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
      >

        <List style={styles.list}>
          {this.props.applications.map(this.getApplicationsListItem)}
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

export default ApplicationsList;
