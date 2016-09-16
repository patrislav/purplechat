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

class Shell extends React.Component {
  constructor() {
    super()
    this.state = {
      drawerOpen: false
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div style={{ height: '100%' }}>
          <Drawer open={this.state.drawerOpen} onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
            <MenuItem>Menu Item 1</MenuItem>
          </Drawer>

          <div style={containerStyle}>
            <div style={{ flex: '0 0 auto' }}>
              <AppBar title="PurpleChat" onLeftIconButtonTouchTap={() => this.setState({drawerOpen: !this.state.drawerOpen})} />
            </div>
            <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
              {this.props.children || <div style={progressStyle}><CircularProgress /></div>}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Shell
