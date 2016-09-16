import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Shell from 'components/Shell'
// import HomeView from 'components/HomeView'
import ConversationView from 'components/ConversationView'

import 'file?name=../[name].[ext]!./index.html'
import 'file?name=../[name].[ext]!./manifest.json'
import 'file?name=../images/[name].[ext]!../assets/favicon.ico'
import 'file?name=../images/[name].[ext]!../assets/icon-48.png'
import 'file?name=../images/[name].[ext]!../assets/icon-96.png'
import 'file?name=../images/[name].[ext]!../assets/icon-192.png'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const App = () => (
  <Shell>
    <ConversationView />
  </Shell>
)

const mountNode = document.querySelector('#application')

ReactDOM.render(<App />, mountNode)
