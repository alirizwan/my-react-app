import { gql } from 'react-apollo';

export const approveApplication = gql`
  mutation approveApplication(
    $id: String!
  ) {
    updateApplication(
      id: $id,
      status: Approved
    ) {
      id
    }
  }
`;

export const rejectApplication = gql`
  mutation rejectApplication(
    $id: String!
  ) {
    updateApplication(
      id: $id,
      status: Rejected
    ) {
      id
    }
  }
`;

export const discontinueOpportunity = gql`
  mutation discontinueOpportunity(
    $id: String!
    $opportunity: OpportunityInput!
  ) {
    updateOpportunity(
      id: $id,
      opportunity: $opportunity
    ) {
      id
    }
  }
`;

export const extendOpportunity = gql`
  mutation extendOpportunity(
    $id: String!,
    $opportunity: OpportunityInput!
  ) {
    updateOpportunity(
      id: $id,
      opportunity: $opportunity
    ) {
      id
    }
  }
`;

export const createOpportunity = gql`
  mutation createOpportunity(
    $opportunity: OpportunityInput!
  ) {
    createOpportunity(
      opportunity: $opportunity
    ) {
      id
    }
  }
`;
