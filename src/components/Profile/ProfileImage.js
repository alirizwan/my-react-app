import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, View } from "react-native";
import { Spinner } from "native-base";
import ImagePicker from "react-native-image-picker";

class ProfileImage extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    isEditting: PropTypes.bool,
    isUploading: PropTypes.bool,
    isUploaded: PropTypes.bool,

    onImageUpload: PropTypes.func,
    onImageError: PropTypes.func
  };

  getImage = () => {
    return this.props.isEditting
      ? <TouchableOpacity
          onPress={this.onSelectImage}
          style={styles.imageContainer}
        >
          <Image
            style={styles.image}
            source={{ uri: this.props.source }}
            blurRadius={this.props.isUploading ? 15 : 0}
          />
        </TouchableOpacity>
      : <Image style={styles.image} source={{ uri: this.props.source }} />;
  };

  getImageOverlay = () => {
    if (this.props.isUploading) {
      return <Spinner color="#fff" />;
    } else {
      return null;
    }
  };

  onSelectImage = () => {
    const options = {
      title: "Select Profile Picture",
      storageOptions: { skipBackup: true, path: "images" }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        this.props.onImageError(response.error);
      } else if (!response.didCancel) {
        this.props.onImageUpload(response.uri);
      }
    });
  };

  render() {
    return (
      <View>
        {this.getImage()}
        {this.getImageOverlay()}
      </View>
    );
  }
}

const styles = {
  imageContainer: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 64,
    backgroundColor: "#000"
  }
};

export default ProfileImage;
