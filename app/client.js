import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import history from './core/history'
import store from './core/store'
import actions from './actions'
import Router from './core/Router'
import routes from './routes'
import Shell from 'components/Shell'

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
const component = (
  <Provider store={store}>
    <Router history={history} routes={routes}>
      <Shell />
    </Router>
  </Provider>
)
ReactDOM.render(component, mountNode)

setTimeout(() => store.dispatch(actions.startAuthListener()))

// Add service worker functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
