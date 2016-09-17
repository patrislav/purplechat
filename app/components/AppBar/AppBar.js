import React from 'react'
import {default as MuiAppBar} from 'material-ui/AppBar'

const AppBar = (props) => (
  <MuiAppBar {...props} title={props.title || "PurpleChat"} />
)

export default AppBar
