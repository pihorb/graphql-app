import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import { authors, books } from './db'
import { Author$I, Book$I } from './types'

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Author representation',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author: Author$I) =>
        books.filter((book: Book$I) => book.authorId === author.id),
    },
  }),
})

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book representation',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book: Book$I) =>
        authors.find((author: Author$I) => author.id === book.authorId),
    },
  }),
})
