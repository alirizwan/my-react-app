import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import { ProductById } from '../queries';
import { CreateApplication } from '../mutations';

import { Container } from 'native-base';
import { ActivityIndicator, ScrollView, Text } from 'react-native';

import PartnerWithProductHeader from './PartnerWithProductHeader';
import PartnerWithProductButton from './PartnerWithProductButton';
import ProductOpportunity from '../ProductInfoPage/ProductOpportunity';

class PartnerWithProductPage extends Component {
  get activeOpportunity() {
    return (
      this
        .props
        .data
        .products[0]
        .opportunities
        .filter(o => o.isActive)
    )[0];
  };

  onPartner = async () => {
    const status = (
      (this.activeOpportunity.visibility === 'Public')
        ? 'Approved'
        : 'Unread'
    );

    await this.props.createApplication({
      variables: {
        application: {
          status: status,
          opportunity: this.activeOpportunity.id
        }
      }
    });

    // TODO: Confirmation should be nicer than an alert.

    if (this.activeOpportunity.visibility === 'Public') {
      alert(this.props.products[0].name + ' is now available in your store!');
    } else {
      alert('Your application has been submitted. Thank you!');
    }

    this.props.navigation.goBack();
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { loading, products } = this.props.data;

    if (loading) {
      return (
        <Container style={styles.loading}>
          <ActivityIndicator animating size="small" />
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <PartnerWithProductHeader onBack={this.onBack} product={products[0]} />
          <ProductOpportunity product={products[0]} readOnly />

          <ScrollView style={styles.padded}>
            {
              this.activeOpportunity.visibility === 'Public' && (
                <Text style={styles.text}>
                  Once you've accepted this
                  opportunity, {products[0].name} will be available
                  in your store for you to sell. If this opportunity
                  expires or is discontinued, any broadcasts you've made for
                  this product will remain visible, but you will not receive
                  any more sales from the broadcast.
                </Text>
              )
            }

            {
              this.activeOpportunity.visibility === 'Private' && (
                <Text style={styles.text}>
                  Once you apply to this opportunity, your application
                  will be reviewed by {products[0].owner.name}. If accepted, you
                  will receive an email with further instructions.
                </Text>
              )
            }
          </ScrollView>

          <PartnerWithProductButton
            private={this.activeOpportunity.visibility === 'Private'}
            onClick={this.onPartner}
          />
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
    backgroundColor: "#FFF"
  },

  padded: {
    margin: 15,
    flex: 1
  },

  text: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Montserrat',
    color: '#777777',
    lineHeight: 28
  }
};

export default compose(
  graphql(ProductById, {
    options: ({ screenProps }) => ({
      variables: { product: screenProps.product }
    })
  }),
  graphql(CreateApplication, {
    name: 'createApplication'
  })
)(PartnerWithProductPage);
