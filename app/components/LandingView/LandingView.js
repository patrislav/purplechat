import React from 'react'
import GoogleLoginButton from 'components/GoogleLoginButton'

const containerStyle = {
  display: 'flex',
  flex: '1 1 auto'
}

const buttonStyle = {
  margin: 'auto',
  width: '80%',
  maxWidth: '350px',
  height: '60px'
}

const LandingView = (props) => (
  <div style={containerStyle}>
    <GoogleLoginButton onTouchTap={props.onGoogleLogin} style={buttonStyle} />
  </div>
)

export default LandingView
