import  React, {Component} from "react";
import { Container, Spinner } from "native-base";

import ApplicationsList from './ApplicationsList';
import ApplicationsListHeader from './ApplicationsListHeader';

class ApplicationsListPage extends Component {

  get opportunity() {
    return this.props.navigation.state.params.opportunity;
  };

  get applications() {
    return this.props.navigation.state.params.opportunity.applications;
  };


  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onItemPress = (application) => {
    this.props.navigation.navigate('ApplicationDetail', {
      application: application,
      opportunity: this.opportunity
    });
  };

  render() {
    return (
      <Container>
        <ApplicationsListHeader
          onDismiss={this.onDismiss}
        />

        <ApplicationsList
          opportunity={this.opportunity}
          applications={this.applications}
          onItemPress={this.onItemPress}
        />
      </Container>
    );
  }
}

export default ApplicationsListPage;
