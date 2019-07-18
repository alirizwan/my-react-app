import { gql } from "react-apollo";

export const getVideos = gql`
query GetVideos ($owner: String!) {
  videos(owner: $owner) {
    id
    name
    description
    live
    wowzaId
    url
    product {
      id
      name
      images {
        url
      }
    }
    opportunity {
      id
    }
  }
}
`;
