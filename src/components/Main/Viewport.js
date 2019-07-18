import React, { Component } from "react";
import { Platform, View, ActivityIndicator } from "react-native";
import { TabNavigator } from "react-navigation";
import { NavigationComponent } from "react-native-material-bottom-navigation";

import { connect } from 'react-redux';

import Explore from '../Explore/Explore';
import Products from "../Products/Products";
import Video from "../Video/Video";
import Messages from '../Messages/Messages';
import Menu from "../Menu/Menu";

class Viewport extends Component {
  getRoutes() {
    return {
      Explore: { screen: Explore },
      Products: { screen: Products },
      Video: { screen: Video },
      Messages: { screen: Messages },
      Menu: { screen: Menu }
    };
  }

  getOptions() {
    const options = {
      swipeEnabled: true,
      animationEnabled: true,
      tabBarOptions: { activeTintColor: "#1abc9c" },
      tabBarPosition: "bottom"
    };

    const androidOverrides = {
      tabBarComponent: NavigationComponent
    };

    const iosOverrides = {
      tabBarOptions: {
        showLabel: false,
        activeTintColor: "#1abc9c",
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#fff"
      }
    };

    return Platform.OS === "ios"
      ? Object.assign({}, options, iosOverrides)
      : Object.assign({}, options, androidOverrides);
  }

  render() {
    const LoadingIndicator = () => <View style={styles.container}><ActivityIndicator /></View>
    const Navigator = TabNavigator(this.getRoutes(), this.getOptions());
    return this.props.isAccountLoaded ? <Navigator /> : <LoadingIndicator />;
  }
}

const styles = {
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
};

const mapStateToProps = (state) => ({
  isAccountLoaded: state.account.isAccountLoaded
});

export default connect(mapStateToProps)(Viewport);
