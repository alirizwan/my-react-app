import { gql } from "react-apollo";

export const getAccountById = gql`
  query GetAccount($id: String) {
    accounts(id: $id) {
      id
      externalAuthId
      username
      email
      address {
        id
        street1
        street2
        state
        postalCode
        country
      }
    }
  }
`;

export const getAccountByExternalAuthId = gql`
  query GetAccountByExternalAuthId($externalAuthId: String) {
    accounts(externalAuthId: $externalAuthId) {
      id
    }
  }
`;
