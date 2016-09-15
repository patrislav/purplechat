import React from 'react'
import ReactDOM from 'react-dom'

import 'file?name=../[name].[ext]!./index.html'

const App = () => (
  <div>Hello world!</div>
)

const mountNode = document.querySelector('#application')

ReactDOM.render(<App />, mountNode)
