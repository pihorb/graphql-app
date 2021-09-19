import React, { useEffect, useState } from 'react'
import { getBooks, getAuthors, getBook, getAuthor } from '../../graphql/queries'
import { useQuery } from '@apollo/client'

const queries = {
  books: {
    id: 'books',
    label: 'Books',
    query: getBooks,
    idRequired: false,
  },
  book: {
    id: 'book',
    label: 'Book',
    query: getBook,
    idRequired: true,
  },
  authors: {
    id: 'authors',
    label: 'Authors',
    query: getAuthors,
    idRequired: false,
  },
  author: {
    id: 'author',
    label: 'Author',
    query: getAuthor,
    idRequired: true,
  },
}

const QueryResult: React.FC = () => {
  const [query, setQuery] = useState(queries['books'])
  const [queryId, setQueryId] = useState(1)

  const { error, data } = useQuery(query.query, {
    variables: { id: queryId },
  })

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <>
      <div className="query-controllers">
        <div className="controller">
          <label htmlFor="query">Select Query:</label>
          <select
            id="query"
            onChange={({ target: { value } }) => setQuery(queries[value])}
            value={query.id}
          >
            {Object.values(queries).map((query, index) => (
              <option key={index} value={query.id}>
                {query.label}
              </option>
            ))}
          </select>
        </div>
        {query.idRequired && (
          <div className="controller">
            <label htmlFor="query-id">Select Id:</label>
            <input
              max="3"
              min="1"
              required
              type="number"
              id="query-id"
              defaultValue={queryId}
              onChange={({ target: { value } }) => setQueryId(+value)}
            />
          </div>
        )}
      </div>
      <div className="query-response">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  )
}

export default QueryResult
