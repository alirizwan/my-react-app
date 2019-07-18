import { gql } from "react-apollo";

export const createAddress = gql`
  mutation createAddress(
    $street1: String!
    $street2: String!
    $city: String!
    $state: String!
    $postalCode: String!
    $name: String!
  ) {
    createAddress(
      name: $name
      street1: $street1
      street2: $street2
      city: $city
      state: $state
      postalCode: $postalCode
      country: "US"
      type: Origin
    ) {
      id
    }
  }
`;

export const updateAccount = gql`
  mutation updateAccount($id: String!, $addressId: String!) {
    updateAccount(id: $id, addressId: $addressId) {
      id
    }
  }
`;

export const removeAddressFromAccount = gql`
  mutation removeAddressFromAccount($id: String!) {
    removeAddressFromAccount(id: $id) {
      id
    }
  }
`;

export const deleteAddress = gql`
  mutation deleteAddress($id: String!) {
    deleteAddress(id: $id)
  }
`;
