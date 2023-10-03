import { gql } from '@apollo/client'

export const CREATE_NOTE = gql`
  mutation createNote($title: String!, $content: String!, $pinned: Boolean){
    createNote(title: $title, content: $content, pinned: $pinned){
      id
      title
      content
      pinned
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $title: String, $content: String, $pinned: Boolean){
    updateNote(id: $id, title: $title, content: $content, pinned: $pinned){
      id
      title
      content
      pinned
    }
  }
`
export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!){
    deleteNote(id: $id){
      id
      title
    }
  }
`