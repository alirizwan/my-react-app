import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Item, ListItem, Input, Label } from "native-base";
import { Switch, Text, DatePickerIOS } from 'react-native';

class AddOpportunityForm extends Component {
  render() {
    return (
      <Form style={styles.form}>
        <Item style={styles.switch} fixedLabel last>
          <Label style={styles.label}>Percentage Commission</Label>

          <Switch
            value={this.props.percent}
            onValueChange={this.props.onPercentChange}
          />
        </Item>

        <Item fixedLabel last>
          <Label style={styles.label}>Commission</Label>

          <Input
            placeholder={this.props.percent ? '0%' : '$0'}
            value={this.props.amount}
            onChange={this.props.onAmountChange}
          />
        </Item>

        <ListItem itemDivider style={styles.divider} />

        <Item style={styles.switch} fixedLabel last>
          <Label style={styles.label}>Private</Label>

          <Switch
            value={this.props.private}
            onValueChange={this.props.onPrivateChange}
          />
        </Item>

        <ListItem itemDivider style={styles.divider}>
          <Text style={styles.info}>
            Private opportunities require you to approve or reject
            applications from influencers before they can sell your product.
          </Text>
        </ListItem>

        <Item style={styles.switch} fixedLabel last>
          <Label style={styles.label}>Expires</Label>
        </Item>

        <DatePickerIOS
          date={this.props.expiresAt}
          onDateChange={this.props.onExpiresAtChange}
          mode="date"
        />
      </Form>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#dcdcdc",
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  },

  switch: {
    height: 50,
    paddingRight: 15
  },

  info: {
    fontSize: 13,
    color: "#777"
  },

  divider: {
    borderBottomColor: "#dcdcdc",
    borderBottomWidth: 1
  }
};

export default AddOpportunityForm;
