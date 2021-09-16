import React from 'react'
import ReactDOM from 'react-dom'
import Button from './components/Button/Button'

const App = () => (
  <>
    <Button title={'Hello world'} />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
