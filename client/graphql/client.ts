import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://pihorb-graphql-app.herokuapp.com/graphql',
  cache: new InMemoryCache(),
})
