import { gql } from "react-apollo";

export const getProducts = gql`
  query GetProducts {
    stores {
      products {
        id
        name
        description
        price
        sku

        images {
          url
        }

        opportunities {
          applications {
           id
          }
        }
        owner {
          id
          picture
          name
        }
      }
    }
  }
`;

export const getProductById = gql`
  query GetProduct($id: String) {
    products(id: $id) {
      id
      name
      description
      price
      sku

      owner {
        id
      }

      images {
        url
      }

      orders {
        id
        charge
        amount
        createdAt
      }

      activeOpportunity{
        id
      }
    }
  }
`;
