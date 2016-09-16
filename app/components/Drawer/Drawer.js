import React from 'react'
import {default as MuiDrawer} from 'material-ui/Drawer'

const Drawer = (props) => (
  <MuiDrawer docked={false} width={300} {...props} />
)

export default Drawer
