import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Item, Icon, Input, Button, Text } from "native-base";

class ProductListSearchHeader extends Component {
  static propTypes = {
    query: PropTypes.string,
    onQueryChange: PropTypes.func
  };

  render() {
    return (
      <Header style={styles.header} searchBar rounded>
        <Item>
          <Icon name="search" />
          <Input
            value={this.props.query}
            onChange={this.props.onQueryChange}
            placeholder="Search"
          />
          <Icon name="funnel" />
        </Item>
      </Header>
    );
  }
}

const styles = {
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    paddingTop: 0
  }
};

export default ProductListSearchHeader;
