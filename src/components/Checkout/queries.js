import { gql } from 'react-apollo';

export const getProductById = gql`
  query getProductById(
    $product: String!
  ) {
    products(
      id: $product
    ) {
      id
      name
      price
    }
  }
`;
