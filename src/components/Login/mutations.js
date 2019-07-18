import { gql } from "react-apollo";

export const deleteAccountById = gql`
  mutation deleteAccount($id: String!) {
    deleteAccount(id: $id)
  }
`;
