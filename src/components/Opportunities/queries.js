import { gql } from 'react-apollo';

export const productOpportunities = gql`
  query productOpportunities(
    $product: String!
  ) {
    products(
      id: $product
    ) {
      id
      name
      description
      price
      sku

      opportunities {
        id
        isActive
        isDiscontinued
        isPercentage
        amount
        visibility
        expiresAt
        
        applications {
           id
           createdAt
           status
        }
      }
    }
  }
`;
