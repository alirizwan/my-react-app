import React, { Component } from "react";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { AsyncStorage } from "react-native";

import { StyleProvider } from "native-base";
import getTheme from "../../../native-base-theme/components";
import commonColor from "../../../native-base-theme/variables/commonColor";

import { ApolloClient, ApolloProvider, createNetworkInterface } from "react-apollo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from '@cmp/redux';
import { loginWithSavedSession } from '@cmp/redux/actions/account';

import { View } from "react-native";
import Viewport from "./Viewport";
import VideoViewerModal from "../Video/VideoViewer/VideoViewerModal";

class Main extends Component {

  render() {
    const networkInterface = createNetworkInterface({
      uri: REACT_APP_API_URL
    });
    networkInterface.use([
      {
        applyMiddleware(req, next) {
          if (!req.options.headers) {
            req.options.headers = {};
          }

          AsyncStorage.getItem("@cmp:id_token").then(authorization => {
            req.options.headers.authorization = authorization
              ? `Bearer ${authorization}`
              : null;
            next();
          });
        }
      }
    ]);

    const client = new ApolloClient({
      networkInterface: networkInterface
    });

    const store = createStore(
      combineReducers({
        ...reducers,
        apollo: client.reducer()
      }),
      applyMiddleware(thunk),
      applyMiddleware(client.middleware())
    );

    store.dispatch(loginWithSavedSession());

    return (
      <ApolloProvider store={store} client={client}>
        <StyleProvider style={getTheme(commonColor)}>
          <View style={styles.container}>
            <Viewport />
            <VideoViewerModal />
          </View>
        </StyleProvider>
      </ApolloProvider>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default Main;
