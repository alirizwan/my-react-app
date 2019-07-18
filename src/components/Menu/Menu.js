import React, { Component } from "react";
import { Icon } from "native-base";
import { StackNavigator } from "react-navigation";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import MainMenuPage from "./MainMenuPage";
import VideoListPage from "../Video/VideoList/VideoListPage";


class Menu extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="menu" style={{ color: tintColor }} />
  };

  getRoutes() {
    return {
      MainMenuPage: { screen: MainMenuPage, path: "" },
      Login: { screen: Login, path: "login" },
      Profile: { screen: Profile, path: "profile/:user" },
      VideoListPage: { screen: VideoListPage, path: "videos" }
    };
  }

  getOptions() {
    return {
      initialRouteName: "MainMenuPage",
      headerMode: "none",
      cardStyle: { backgroundColor: "#fff" }
    };
  }

  render() {
    const Navigation = StackNavigator(this.getRoutes(), this.getOptions());

    return <Navigation />;
  }
}

export default Menu;
