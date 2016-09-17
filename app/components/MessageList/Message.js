import React from 'react'
import Paper from 'material-ui/Paper'

const style = {
  width: '100%',
  display: 'flex'
}

const paperStyle = {
  maxWidth: '90%',
  padding: '10px',
  margin: '4px 7px',
  borderRadius: '10px',
}

const Message = (props, context) => {
  const incomingStyle = {
    marginRight: 'auto'
  }

  const outgoingStyle = {
    marginLeft: 'auto',
    backgroundColor: context.muiTheme.palette.primary1Color,
    color: context.muiTheme.palette.alternateTextColor
  }

  const { message } = props

  return (
    <div style={Object.assign({}, props.style, style)}>
      <Paper style={Object.assign({}, paperStyle, message.isMine ? outgoingStyle : incomingStyle)}>
        {message.text}
      </Paper>
    </div>
  )
}

Message.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Message
