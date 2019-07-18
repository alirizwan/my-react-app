import { gql } from 'react-apollo';

export const CreateApplication = gql`
  mutation CreateApplication(
    $application: ApplicationInput
  ) {
    createApplication(
      application: $application
    ) {
      id
    }
  }
`
