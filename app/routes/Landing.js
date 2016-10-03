import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Actions from 'actions'
import Shell from 'components/Shell'
import LandingView from 'components/LandingView'

@connect(state => ({
  auth: state.auth
}))
export default class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(Actions, this.props.dispatch)
  }

  render() {
    return (
      <Shell>
        <LandingView onGoogleLogin={this._handleGoogleLogin} />
      </Shell>
    )
  }

  _handleGoogleLogin = () => {
    this.actions.attemptLogin('google')
  }
}
