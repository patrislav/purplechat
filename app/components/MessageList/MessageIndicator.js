import React from 'react'
import ActionDone from 'material-ui/svg-icons/action/done'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'

const MessageIndicator = ({ message }, { muiTheme }) => {
  const style = {
    color: muiTheme.palette.primary2Color,
    width: '12px',
    height: '12px'
  }

  return (
    <div>
      {message.read ? <ActionDoneAll style={style} /> : <ActionDone style={style} />}
    </div>
  )
}

MessageIndicator.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default MessageIndicator
