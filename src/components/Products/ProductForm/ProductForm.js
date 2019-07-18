import React, { Component } from "react";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Form,
  ListItem,
  Item,
  Label,
  Input,
  Picker,
  Text,
  Button
} from "native-base";
import ImagePicker from "react-native-image-picker";
import ImageSelector from "./ImageSelector";

class ProductForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string.isRequired,
    sku: PropTypes.string,
    stock: PropTypes.string,
    image: PropTypes.string,
    isUploading: PropTypes.bool,
    isUploaded: PropTypes.bool,
    isPriceReadOnly: PropTypes.bool,

    onNameChange: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onPriceChange: PropTypes.func,
    onSKUChange: PropTypes.func,
    onStockChange: PropTypes.func,

    onImageUpload: PropTypes.func,
    onImageError: PropTypes.func
  };

  onSelectImage = () => {
    const options = {
      title: "Select Product Picture",
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
    const priceStyles = {
      opacity: this.props.isPriceReadOnly ? 0.5 : 1.0
    };

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <ImageSelector
          image={this.props.image}
          isUploaded={this.props.isUploaded}
          isUploading={this.props.isUploading}
          onSelect={this.onSelectImage}
        />

        <Form style={styles.form}>
          <Item fixedLabel>
            <Label style={styles.label}>Name</Label>

            <Input
              placeholder="Something Awesome"
              value={this.props.name}
              onChange={this.props.onNameChange}
            />
          </Item>

          <Item style={priceStyles} fixedLabel last>
            <Label style={styles.label}>Price</Label>

            <Input
              placeholder="$0"
              keyboardType="numeric"
              value={this.props.price}
              onChange={this.props.onPriceChange}
              disabled={this.props.isPriceReadOnly}
            />
          </Item>

          {
            this.props.isPriceReadOnly &&
            <ListItem itemDivider>
              <Text style={styles.info}>
                You can't change the price on products that
                have currently active opportunities.
              </Text>
            </ListItem>
          }

          <ListItem itemDivider />

          <Item style={styles.individual} last>
            <Input
              placeholder="Briefly describe your product"
              value={this.props.description}
              onChange={this.props.onDescriptionChange}
              style={{ height: 100 }}
              multiline
            />
          </Item>

          <ListItem itemDivider />

          <Item style={styles.individual} fixedLabel last>
            <Label style={styles.label}>Stock</Label>

            <Input
              placeholder="Unlimited"
              keyboardType="numeric"
              value={this.props.stock}
              onChange={this.props.onStockChange}
            />
          </Item>

          <Item style={styles.individual} fixedLabel last>
            <Label style={styles.label}>SKU</Label>

            <Input
              placeholder="Optional"
              keyboardType="numeric"
              value={this.props.sku}
              onChange={this.props.onSKUChange}
            />
          </Item>

          <ListItem itemDivider>
            <Text style={styles.info}>
              An SKU helps you identify your product on sales reports, even if
              the name of that product changes.
            </Text>
          </ListItem>
        </Form>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#f4f4f4"
  },

  form: {
    backgroundColor: "#fff"
  },

  label: {
    fontWeight: "bold"
  },

  individual: {
    borderTopWidth: 1
  },

  info: {
    fontSize: 13,
    color: "#777"
  }
};

export default ProductForm;
