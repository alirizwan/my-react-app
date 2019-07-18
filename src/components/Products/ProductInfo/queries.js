import { gql } from 'react-apollo';

export const ProductById = gql`
  query ProductInfo(
    $product: String!
  ) {
    products(
      id: $product
    ) {
      id
      name
      description
      price

      images {
        url
      }

      owner {
        id
        name
      }

      opportunities {
        id
        isActive
        isPercentage
        amount
        visibility
        expiresAt
      }
    }
  }
`;

export const GetVideoById = gql`
  query GetVideById(
    $video: String!
  ) {
    videos(
        id: $video
    ) {
      id
      product {
        id
        name
      }
      activities {
        id
        message
        type
        account {
          id
          name
          picture
        }
      }
    }
  }
`;
