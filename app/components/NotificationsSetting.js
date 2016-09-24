import React from 'react'
import {ListItem} from 'material-ui/List'
import Toggle from 'material-ui/Toggle'

const NotificationsSetting = (props) => (
  <ListItem
    primaryText="Notifications"
    rightToggle={<Toggle disabled={props.disabled} toggled={props.toggled} onToggle={props.onToggle} />}
    />
)

export default NotificationsSetting
