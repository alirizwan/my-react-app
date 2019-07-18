import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StatusBar } from "react-native";
import Video from "react-native-video";
import ProductDetailBar from "./ProductDetailBar";
import VideoViewerHeader from "./Overlay/VideoViewerHeader";
import VideoViewerFooter from "./Overlay/VideoViewerFooter";
import Scrim from "../../Common/Scrim";
import ProductInfoModal from '../../Products/ProductInfo/ProductInfoModal';

import { connect } from "react-redux";
import { togglePaused, toggleProductInfo, toggleCommentModal } from "@cmp/redux/actions/videoViewer";
import CommentModal from '../../Products/ProductInfo/CommentModal';

class VideoViewer extends Component {
  static propTypes = {
    onDismiss: PropTypes.func
  };

  getOpportunity = () => {
    return (this.props.opportunity) ? this.props.opportunity.id : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <Scrim style={styles.scrimHeader} />
        <Scrim style={styles.scrimFooter} reversed />

        <ProductInfoModal
          product={this.props.product.id}
          opportunity={this.getOpportunity()}
          isVisible={this.props.isProductInfoVisible}
          onDismiss={this.props.onHideDetails}
        />

        <CommentModal
          video={this.props.video.id}
          isVisible={this.props.isCommentModalVisible}
          onDismiss={this.props.onCommentToggled}
        />

        <VideoViewerHeader
          onDismiss={this.props.onDismiss}
        />

        <Video
          source={{uri: this.props.video.url}}
          style={styles.video}
          paused={this.props.isPaused}
        />

        <ProductDetailBar
          product={this.props.product}
          onShowDetails={this.props.onShowDetails}
          onBuy={this.props.onShowDetails}
        />

        <VideoViewerFooter
          isPaused={this.props.isPaused}
          onPausePressed={this.props.onPausePressed}
          onCommentPressed={this.props.onCommentToggled}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative'
  },

  video: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 80
  },

  scrimHeader: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 75,
    zIndex: 2,
  },

  scrimFooter: {
    position: 'absolute',
    width: '100%',
    bottom: 80,
    height: 75,
    zIndex: 2
  }
};

const mapStateToProps = state => ({
  ...state.videoViewer
});

const mapActionsToProps = dispatch => ({
  onPausePressed: _ => dispatch(togglePaused()),
  onShowDetails: _ => dispatch(toggleProductInfo()),
  onHideDetails: _ => dispatch(toggleProductInfo()),
  onCommentToggled: _ => dispatch(toggleCommentModal())
});

export default (connect(mapStateToProps, mapActionsToProps)(VideoViewer));
