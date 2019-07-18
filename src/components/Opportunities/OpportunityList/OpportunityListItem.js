import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ListItem, Right, Body, Text, Icon } from "native-base";

class OpportunityListItem extends Component {
  get commission() {
    const amount = (
      (this.props.isPercentage)
        ? `${this.props.amount}%`
        : `$${this.props.amount}`
    );

    return `${amount} Commission`
  };

  get expiration() {
    const date = moment(this.props.expiresAt).format('MMMM D, YYYY');
    const isExpired = moment(this.props.expiresAt).diff(moment()) <= 0;
    const expiresOrExpired = isExpired ? 'Expired' : 'Expires';
    return `${expiresOrExpired} on ${date}`;
  };

  get activeAndVisibility() {
    const activeOrInactive = (this.props.isActive) ? 'Active' : 'Inactive';
    const publicOrPrivate = (this.props.visibility === 'Public') ? 'Public' : 'Private';
    return `${activeOrInactive} - ${publicOrPrivate} Offer`;
  };

  get styles() {
    return {
      opacity: this.props.isActive ? 1.0 : 0.5
    };
  };

  render() {
    return (
      <ListItem style={this.styles} onPress={this.props.onPress} last={this.props.isLast}>
        <Body>
          <Text style={styles.number}>
            {this.commission}
          </Text>

          <Text style={styles.name}>
            {this.activeAndVisibility}
          </Text>

          <Text style={styles.details}>
            {this.expiration}
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

export default OpportunityListItem;
