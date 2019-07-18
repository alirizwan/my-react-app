import { gql } from "react-apollo";

export const createProduct = gql`
  mutation createProduct(
    $name: String!
    $price: Float!
    $description: String
    $sku: String
    $image: String!
  ) {
    createProduct(
      name: $name
      price: $price
      description: $description
      sku: $sku
      image: $image
      owner: ""
    ) {
      id
      name
      price
      description
      sku
      image
    }
  }
`;

export const updateProduct = gql`
  mutation updateProduct(
    $id: String!
    $name: String!
    $price: Float!
    $description: String
    $sku: String
    $image: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      price: $price
      description: $description
      sku: $sku
      image: $image
      owner: ""
    ) {
      id
      name
      price
      description
      sku
      image
    }
  }
`;

export const deleteProductById = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;
