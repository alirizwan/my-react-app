import { gql } from "react-apollo";

export const createOrder = gql`
  mutation createOrder(
    $order: OrderInput!
  ) {
    createOrder(
      order: $order
    ) {
      id
      charge
    }
  }
`;

export const createAddress = gql`
  mutation createAddress(
    $address: AddressInput!
  ) {
    createAddress(
      address: $address
    ) {
      id
    }
  }
`;
