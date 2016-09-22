import React from 'react'
import Paper from 'material-ui/Paper'

const paperStyle = {
  maxWidth: '85%',
  padding: '10px',
  borderRadius: '15px',
  marginLeft: '5px',
  marginRight: '5px'
}

const imageStyle = {
  maxWidth: '100%',
  height: 'auto'
}

const MessagePaper = (props, context) => {
  const { message, onLoadAttachment } = props

  const outgoingStyle = {
    backgroundColor: context.muiTheme.palette.primary1Color,
    color: context.muiTheme.palette.alternateTextColor
  }

  return (
    <Paper style={Object.assign({}, paperStyle, message.isMine ? outgoingStyle : {})}>
      {message.type === 'image'
        ? <img style={imageStyle} src={message.imageUrl} onLoad={onLoadAttachment} />
        : message.text
      }
    </Paper>
  )
}

MessagePaper.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default MessagePaper
