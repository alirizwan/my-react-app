import React, { Component } from "react";
import { ListItem, Right, Body, Text, Icon } from "native-base";

import moment from "moment";

class ApplicationsListItem extends Component {

  get created() {
    return moment(this.props.createdAt).format('MMMM D, YYYY');
  };

  render() {
    return (
      <ListItem style={this.styles} onPress={this.props.onPress} last={this.props.isLast}>
        <Body>
          <Text style={styles.number}>
            #{this.props.id} - {this.created}
          </Text>

          <Text style={styles.details}>
            {this.props.status}
          </Text>
        </Body>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}

const styles = {
  number: { fontWeight: "bold" },
  details: { color: "#ccc" }
};

export default ApplicationsListItem;
