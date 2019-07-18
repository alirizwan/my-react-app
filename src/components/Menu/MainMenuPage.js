import React, { Component } from "react";

import { ScrollView, AsyncStorage } from "react-native";
import { Container, List, ListItem, Text, Separator } from "native-base";
import MenuItem from "./MenuItem";

import { connect } from 'react-redux';
import { logout } from '@cmp/redux/actions/account';

class MainMenuPage extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="menu" style={{ color: tintColor }} />
  };

  onLogin = () => {
    this.props.navigation.navigate("Login");
  };

  onViewProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  onViewVideoList = () => {
    this.props.navigation.navigate("VideoListPage");
  };

  getLoginMenuItem = () => {
    return <MenuItem label="Log in" icon="lock" onPress={this.onLogin} />;
  };

  getProfileMenuItem = () => {
    return (
      <MenuItem
        label={this.props.name}
        image={this.props.picture}
        onPress={this.onViewProfile}
      />
    );
  };

  getLogoutMenuItem = () => {
    return (
      <MenuItem label="Log out" onPress={this.props.onLogout} danger last />
    );
  };


  render() {
    return (
      <Container>
        <ScrollView>
          <List>
            <ListItem itemHeader>
              <Text>You</Text>
            </ListItem>
            {this.props.isLoggedIn
              ? this.getProfileMenuItem()
              : this.getLoginMenuItem()}

            <MenuItem label="Notifications" icon="notifications" last />

            <ListItem itemHeader>
              <Text>Store</Text>
            </ListItem>

            <MenuItem label="Videos" icon="videocam" onPress={this.onViewVideoList} last />

            <ListItem itemHeader>
              <Text>Settings</Text>
            </ListItem>

            <MenuItem label="Settings" icon="settings" />
            <MenuItem label="Privacy" icon="lock" />
            <MenuItem label="Help and support" icon="help-circle" last />

            <Separator bordered />

            {this.props.isLoggedIn && this.getLogoutMenuItem()}
          </List>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.account
});

const mapActionsToProps = dispatch => ({
  onLogout: _ => dispatch(logout())
});

export default connect(mapStateToProps, mapActionsToProps)(MainMenuPage);
