import { gql } from "react-apollo";

export const getProductOrders = gql`
  query GetProductOrders($id: String) {
    products(id: $id) {
      id
      name
      description
      price
      sku
      orders {
        id
        charge
        amount
        createdAt
        status
        destination {
          id
          street1
          street2
          city
          state
          postalCode
          country
          name
          company
          phone
          email
          type
        }
        
         
      }
    }
  }
`;
