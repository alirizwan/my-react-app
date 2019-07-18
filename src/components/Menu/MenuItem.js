import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  Left,
  Right,
  Body,
  Text,
  Icon,
  Thumbnail
} from "native-base";

class MenuItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    image: PropTypes.string,
    last: PropTypes.bool,
    danger: PropTypes.bool,
    onPress: PropTypes.func
  };

  getIcon = () => {
    return this.props.icon
      ? <Left>
          <Icon name={this.props.icon} />
        </Left>
      : this.props.image
        ? <Left>
            <Thumbnail
              source={{ uri: this.props.image }}
              small
              style={styles.image}
            />
          </Left>
        : null;
  };

  render() {
    return (
      <ListItem
        icon={this.props.icon !== undefined || this.props.image !== undefined}
        last={this.props.last}
        onPress={this.props.onPress}
      >
        {this.getIcon()}

        <Body>
          <Text style={{ color: this.props.danger ? "#e74c3c" : undefined }}>
            {this.props.label}
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
  image: {
    height: 24,
    width: 24,
    borderRadius: 12
  }
};

export default MenuItem;
