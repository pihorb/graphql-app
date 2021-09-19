import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql'
import { books, authors } from './db'
import { BookType, AuthorType } from './graphql-types'
import cors from 'cors'

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'Single book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of books',
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: 'Single author',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_, args) => authors.find((author) => author.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of authors',
      resolve: () => authors,
    },
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add new book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        }

        books.push(book)

        return book
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add new author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        }

        authors.push(author)

        return author
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

const app = express()
const PORT = process.env.PORT || 4000
PORT
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.listen(PORT, () =>
  console.log(`
    🚀  Server is ready at ${PORT}
    📭  Query at https://studio.apollographql.com/dev
    `)
)

// deploy server
// git subtree push --prefix server/ heroku master
