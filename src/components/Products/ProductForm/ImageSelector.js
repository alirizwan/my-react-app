import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Icon, Spinner } from "native-base";

class ImageSelector extends Component {
  static propTypes = {
    image: PropTypes.string,
    isUploading: PropTypes.bool,
    isUploaded: PropTypes.bool,
    onSelect: PropTypes.func
  };

  getImageOverlay = () => {
    if (this.props.isUploading) {
      return <Spinner color="#fff" />;
    } else if (!this.props.isUploaded) {
      return (
        <View style={styles.label}>
          <Icon style={styles.labelIcon} name="add" />
          <Text style={styles.labelText}>Add a Photo</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  getImage = () => {
    console.log(this.props.image);

    if (this.props.image !== "") {
      return (
        <Image
          resizeMode="cover"
          blurRadius={this.props.isUploading ? 15 : 0}
          source={{ uri: this.props.image }}
          style={styles.image}
        />
      );
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View
          style={
            this.props.isUploading || this.props.isUploaded
              ? styles.imageContainerUploaded
              : styles.imageContainer
          }
        >
          {this.getImage()}
          {this.getImageOverlay()}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 200,
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D5DC"
  },

  imageContainerUploaded: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 200,
    backgroundColor: "#f4f4f4",
    borderBottomWidth: 0
  },

  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute"
  },

  label: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  labelIcon: {
    color: "#777"
  },

  labelText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#777"
  }
};

export default ImageSelector;
