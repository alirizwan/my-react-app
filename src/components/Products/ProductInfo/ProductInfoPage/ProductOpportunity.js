import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, View, TouchableOpacity } from 'react-native';
import OpportunityTerm from './OpportunityTerm';

class ProductOpportunity extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      opportunities: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        isPercentage: PropTypes.bool,
        expiresAt: PropTypes.string,
        visibility: PropTypes.string
      }))
    }),
    onPartner: PropTypes.func
  };

  get activeOpportunity() {
    return (
      this
        .props
        .product
        .opportunities
        .filter(o => o.isActive)
    )[0];
  };

  get commission() {
    const { isPercentage, amount } = this.activeOpportunity;
    const formattedAmount = (isPercentage) ? amount + '%' : '$' + amount;
    return formattedAmount + ' Commission Per Sale';
  };

  get expiration() {
    const { expiresAt } = this.activeOpportunity;
    return 'Expires ' + moment(expiresAt).format('MMMM D');
  };

  get buttonLabel() {
    return (
      (this.activeOpportunity.visibility === 'Public')
        ? 'Add to Store'.toUpperCase()
        : 'Apply for Opportunity'.toUpperCase()
    );
  }

  render() {
    if (this.activeOpportunity) {
      return (
        <View style={styles.container}>
          {
            this.props.readOnly || (
              <Text style={styles.title}>
                Sell {this.props.product.name}
              </Text>
            )
          }

          <Text style={styles.subtitle}>
            You can partner {this.props.product.owner.name} and
            sell {this.props.product.name} on cmp!
          </Text>

          <View style={styles.terms}>
            {
              (this.activeOpportunity.visibility === 'Public') &&
              <OpportunityTerm icon="cash" label={this.commission} />
            }

            {
              (this.activeOpportunity.visibility === 'Public') &&
              <OpportunityTerm icon="calendar" label={this.expiration} />
            }

            {
              (this.activeOpportunity.visibility === 'Private') &&
              <OpportunityTerm icon="lock" label="Application Required" />
            }
          </View>

          {
            !this.props.readOnly && (
              <TouchableOpacity onPress={this.props.onPartner} style={styles.button}>
                <Text style={styles.label}>
                  {this.buttonLabel}
                </Text>
              </TouchableOpacity>
            )
          }
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = {
  container: {
    margin: 15,
    padding: 15,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#976CE0'
  },

  terms: {
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#d8d8d8'
  },

  title: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: '#976CE0',

    marginBottom: 15
  },

  subtitle: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '500',
    color: '#333',

    marginBottom: 15
  },

  button: {
    padding: 15,
    marginTop: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 3
  },

  label: {
    fontFamily: 'Open Sans',
    fontWeight: '500',
    letterSpacing: 1,
    textAlign: 'center',
    color: '#976CE0',
    fontWeight: 'bold',
    fontSize: 15
  }
};

export default ProductOpportunity;
