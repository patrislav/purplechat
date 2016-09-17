import React from 'react'
import FlatButton from 'material-ui/FlatButton'

const GoogleLoginButton = (props) => {
  return (
    <FlatButton
      {...props}
      label="Login with Google"
      backgroundColor="#dd4b39"
      style={Object.assign({}, props.style, { color: "#fff" })}
      />
  )
}

export default GoogleLoginButton
