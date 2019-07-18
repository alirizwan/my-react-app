import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
import { Container } from "native-base";

import { connect } from "react-redux";
import { compose, graphql, withApollo } from "react-apollo";
import { getAccountById, getAccountByExternalAuthId } from "./queries";
import { deleteAddress, removeAddressFromAccount } from "./mutations";

import ProfileHeader from "./ProfileHeader";
import ProfileImage from "./ProfileImage";
import UserDetails from "./UserDetails";
import AdditionalOptionsBar from "./AdditionalOptionsBar";
import AddOriginAddressModal from "./AddOriginAddress/AddOriginAddressModal";

import {
  toggleEditting,
  setUserInfo,
  initializeForCurrentUser,
  initializeForUser,
  resetForm,
  setName,
  setEmail,
  setUsername,
  setImage,
  uploadImage,
  setOriginAddress,
  showAddOriginAddress,
  hideAddOriginAddress,
  showChangeEmail,
  hideChangeEmail
 } from '@cmp/redux/actions/profile';

class Profile extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onDismiss: PropTypes.func,
    isInModal: PropTypes.bool
  };

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit();
  };

  onDismiss = () => {
    this.props.onDismiss && this.props.onDismiss();
    this.props.navigation && this.props.navigation.goBack();
  };

  onAddressSubmit = address => {
    this.props.onAddressSubmit(address);
    this.props.onDismissAddOriginAddress();
  };

  onAddressDelete = async () => {
    await this.props.removeAddressFromAccount({
      variables: {
        id: this.props.accountId
      }
    });
    await this.props.deleteAddress({
      variables: {
        id: this.props.originAddress.id
      }
    });
    this.props.onAddressSubmit(null);
  };

  componentWillMount = async () => {
    this.props.onMount();

    if (this.props.navigation.state.params) {
      const externalAuthId = getAccountById(
        this.props.navigation.state.params.user
      );
      this.props.initializeForUser(externalAuthId);
    } else {
      const externalResult = await this.props.client.query({
        query: getAccountByExternalAuthId,
        variables: {
          externalAuthId: this.props.externalAuthId
        }
      });
      const accountResult = await this.props.client.query({
        query: getAccountById,
        variables: {
          id: externalResult.data.accounts[0].id
        }
      });
      this.props.initializeForCurrentUser(
        externalResult.data.accounts[0].id,
        accountResult.data.accounts[0].address
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <AddOriginAddressModal
          onSubmit={this.onAddressSubmit}
          onDismiss={this.props.onDismissAddOriginAddress}
          isVisible={this.props.isAddOriginAddressVisible}
          name={this.props.name}
          accountId={this.props.accountId}
        />

        <ProfileHeader
          isInModal={this.props.isInModal}
          isOwner={this.props.isOwner}
          isEditting={this.props.isEditting}
          onEdit={this.props.onEdit}
          onSubmit={this.props.onEdit}
          name={this.props.name}
          username={this.props.username}
          onReport={_ => {}}
          onDismiss={this.onDismiss}
        />

        <View style={styles.imageContainer}>
          <ProfileImage
            source={this.props.picture}
            isEditting={this.props.isEditting}
            isUploading={this.props.isUploading}
            isUploaded={this.props.isUploaded}
            onImageError={error => alert(error)}
            onImageUpload={this.props.onImageUpload}
          />
        </View>

        <View style={styles.detailContainer}>
          <UserDetails
            isOwner={this.props.isOwner}
            isEditting={this.props.isEditting}
            name={this.props.name}
            username={this.props.username}
            email={this.props.email}
            originAddress={this.props.originAddress}
            onNameChange={this.props.onNameChange}
            onUsernameChange={this.props.onUsernameChange}
            onEmailChange={this.props.onEmailChange}
            onAddOriginAddress={this.props.onAddOriginAddress}
            onDeleteOriginAddress={this.onAddressDelete}
          />
        </View>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4"
  },
  imageContainer: {
    alignSelf: "center",
    paddingTop: 16,
    height: 160
  },
  detailContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#d9d5dc"
  }
};

const mapStateToProps = state => ({
  ...state.profile,
  ...state.account
});

const mapActionsToProps = dispatch => ({
  onDone: _ => dispatch(submitForm()),
  onEdit: _ => dispatch(toggleEditting()),

  onNameChange: e => dispatch(setName(e.nativeEvent.text)),
  onUsernameChange: e => dispatch(setUsername(e.nativeEvent.text)),
  onEmailChange: e => dispatch(setEmail(e.nativeEvent.text)),
  onImageUpload: e => dispatch(uploadImage(e)),
  onAddressSubmit: e => dispatch(setOriginAddress(e)),

  setUserInfo: user => dispatch(setUserInfo(user)),
  initializeForCurrentUser: (accountId, address) =>
    dispatch(initializeForCurrentUser(accountId, address)),
  initializeForUser: userId => dispatch(initializeForUser(userId)),

  onHideChangeEmail: _ => dispatch(hideChangeEmail()),
  onShowChangeEmail: _ => dispatch(showChangeEmail()),

  onAddOriginAddress: _ => dispatch(showAddOriginAddress()),
  onDismissAddOriginAddress: _ => dispatch(hideAddOriginAddress()),
  onMount: _ => dispatch(resetForm())
});

const getAccountQuery = graphql(getAccountById, {
  skip: props => {
    return !props.navigation.state.params;
  },
  options: props => ({
    variables: { id: props.navigation.state.params.user }
  })
});

export default compose(
  graphql(deleteAddress, { name: "deleteAddress" }),
  graphql(removeAddressFromAccount, {
    options: props => ({
      refetchQueries: [
        {
          query: getAccountById,
          variables: { id: props.accountId }
        }
      ]
    }),
    name: "removeAddressFromAccount"
  }),
  getAccountQuery,
  withApollo
)(connect(mapStateToProps, mapActionsToProps)(Profile));
