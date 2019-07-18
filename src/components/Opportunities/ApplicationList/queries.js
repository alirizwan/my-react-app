import { gql } from 'react-apollo';

export const productOpportunityApplications = gql`
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
        }
      }
    }
  }
`;
