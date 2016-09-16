import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import history from './core/history'
import { resolve } from './core/router'
import routes from './routes'
import Shell from 'components/Shell'

// import Shell from 'components/Shell'
// import HomeView from 'components/HomeView'
// import ConversationView from 'components/ConversationView'

import 'file?name=../[name].[ext]!./index.html'
import 'file?name=../[name].[ext]!./manifest.json'
import 'file?name=../images/[name].[ext]!../assets/favicon.ico'
import 'file?name=../images/[name].[ext]!../assets/icon-48.png'
import 'file?name=../images/[name].[ext]!../assets/icon-96.png'
import 'file?name=../images/[name].[ext]!../assets/icon-192.png'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const mountNode = document.querySelector('#application')

function renderComponent(component) {
  ReactDOM.render(component, mountNode)
}

const render = (location) => {
  // First show just an empty shell
  renderComponent(<Shell />)

  // Then resolve the route
  resolve(routes, location)
    .then(renderComponent)
    // .catch(e => console.log(e)) // eslint-disable-line
}

render(history.location)
history.listen(render)
