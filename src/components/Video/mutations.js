import { gql } from "react-apollo";

export const createVideo = gql`
  mutation createVideo(
    $video: VideoInput!
  ) {
    createVideo(
      video: $video
    ) {
      id
      name
      summary
      description
      live
      wowzaId
    }
  }
`;

export const updateVideo = gql`
  mutation updateVideo(
    $id: String!
    $video: VideoInput!
  ) {
    updateVideo(
      id: $id
      video: $video
    ) {
      id
      name
      description
      live
      wowzaId
    }
  }
`;

export const deleteVideoById = gql`
  mutation deleteVideo($id: String!) {
    deleteVideo(id: $id)
  }
`;
