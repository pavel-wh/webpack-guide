import React from 'react'
import { render } from 'react-dom'

const App = () => (
    <h2>React app component</h2>
)

render(<App />, document.querySelector('#react-app'))