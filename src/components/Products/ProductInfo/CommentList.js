import React, { Component } from 'react';

import {GetVideoById} from './queries';

import { compose, graphql } from 'react-apollo';
import {Body, Container, Left, List, ListItem, Right, Thumbnail} from 'native-base';
import {StatusBar, ActivityIndicator, ScrollView, Text} from 'react-native';

import ProductBuyButton from './ProductInfoPage/ProductBuyButton';
import CommentListHeader from './CommentListHeader';

class CommentList extends Component {

  getComments = (video) => {
    return video.activities.map((activity) => {
      if(activity.type === 'Comment') {
        return <ListItem key={activity.id} avatar style={styles.listItem}>
          <Left>
            <Thumbnail source={{ uri: activity.account.picture }} />
          </Left>
          <Body>
            <Text style={styles.name}>{activity.account.name}</Text>
            <Text note>{activity.message}</Text>
          </Body>
          <Right>
            <Text note>{activity.createdAt}</Text>
          </Right>
        </ListItem>;
      }
    });
  };

  render() {
    const { loading, videos } = this.props.data;

    if (loading) {
      return (
        <Container style={styles.loading}>
          <StatusBar hidden={false} barStyle="light-content" />
          <ActivityIndicator animating size="small" />
        </Container>
      );
    } else {
      let comments = this.getComments(videos[0]);
      return (
        <Container style={styles.container}>
          <StatusBar hidden={false} barStyle="light-content" />

          <CommentListHeader
            onDismiss={this.props.onDismiss}
            product={videos[0].product}
            />

          <ScrollView style={styles.scrollView}>
            <List>
              {comments}
            </List>
          </ScrollView>
        </Container>
      );
    }
  }
}

const styles = {
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollView: {
    flex: 1
  },

  container: {
    backgroundColor: "rgb(255, 255, 255)"
  },

  name: {
    fontWeight: "bold"
  },

  listItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

export default compose(
  graphql(GetVideoById, {
    options: ( props ) => {
      let videoId = props.video;
      return {variables: { video: videoId }}
    }
  })
)(CommentList);
