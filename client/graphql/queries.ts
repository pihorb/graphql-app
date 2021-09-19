import { gql } from '@apollo/client'

export const getBooks = gql`
  query getBooks {
    books {
      id
      name
      author {
        id
        name
      }
    }
  }
`

export const getBook = gql`
  query getBook($id: Int!) {
    book(id: $id) {
      id
      name
      author {
        name
      }
    }
  }
`

export const getAuthors = gql`
  query getAuthors {
    authors {
      id
      name
    }
  }
`

export const getAuthor = gql`
  query getAuthor($id: Int!) {
    author(id: $id) {
      id
      name
      books {
        name
      }
    }
  }
`
