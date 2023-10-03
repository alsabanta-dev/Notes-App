import { gql } from '@apollo/client'

export const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      title
      content
      pinned
      updatedAt
      createdAt
    }
  }
`
