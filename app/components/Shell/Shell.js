import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import CircularProgress from 'material-ui/CircularProgress'
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'components/AppBar'
import Drawer from 'components/Drawer'

import theme from './theme'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

const progressStyle = {
  margin: 'auto'
}

const Shell = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <div style={containerStyle}>
      <div style={{ flex: '0 0 auto' }}>
        {props.appBar || <AppBar />}
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        {props.children || <div style={progressStyle}><CircularProgress /></div>}
      </div>
    </div>
  </MuiThemeProvider>
)

export default Shell
