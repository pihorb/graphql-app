import React from 'react'
import ReactDOM from 'react-dom'
import QueryResult from './components/QueryResult/QueryResult'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/client'
import './main.css'

const App = () => {
  return (
    <>
      <QueryResult />
    </>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
