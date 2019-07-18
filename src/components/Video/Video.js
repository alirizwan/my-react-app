import React, { Component } from "react";
import { Container, Icon } from "native-base";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StackNavigator } from "react-navigation";

import Login from "../Login/Login";
import VideoPage from "./VideoPage";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";

class Video extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) =>
      <Icon name="videocam" style={{ color: "#e74c3c" }} />
  };

  getRoutes() {
    return {
      Login: { screen: Login },
      VideoPage: { screen: VideoPage }
    };
  }

  getOptions() {
    return {
      initialRouteName: "VideoPage",
      headerMode: "none",
      cardStyle: { backgroundColor: "#fff" }
    };
  }

  render() {
    const Navigation = StackNavigator(this.getRoutes(), this.getOptions());

    const screenProps = {
      rootNavigation: this.props.navigation
    };

    return <Navigation screenProps={screenProps} />;
  }
}

export default Video;
