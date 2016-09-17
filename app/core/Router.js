import React from 'react'
import {connect} from 'react-redux'
import toRegex from 'path-to-regexp'

@connect(state => ({
  auth: state.auth
}))
export default class Router extends React.Component {
  constructor() {
    super()
    this.state = {
      route: null
    }
  }

  componentDidMount() {
    const { history } = this.props
    this.unlisten = history.listen(location => this.resolveLocation(location, this.props.auth))
  }

  componentWillReceiveProps(props) {
    this.resolveLocation(props.history.location, props.auth)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    if (this.state.route && this.state.route.component) {
      return this.state.route.component
    }
    else {
      return this.props.children
    }
  }

  resolveLocation = (location, auth) => {
    this.selectRoute(null)
    resolve(this.props.routes, location, auth)
      .then(component => this.selectRoute(component))
  }

  selectRoute = (component) => {
    this.setState({
      ...this.state,
      route: { component }
    })
  }
}

function matchURI(path, uri) {
  const keys = []
  const pattern = toRegex(path, keys)
  const match = pattern.exec(uri)
  if (!match) {
    return null
  }

  const params = Object.create(null)
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined
  }

  return params
}

function resolve (routes, location, auth) {
  return new Promise((resolve, reject) => {
    for (const route of routes) {
      const params = matchURI(route.path, location.pathname)
      if (!params) {
        continue
      }

      const result = route.action({ ...location, params, auth })
      if (result) {
        resolve(result)
      }
    }

    // TODO: Better error system
    const error = new Error('Not found')
    error.status = 404
    reject(error)
  })
}
