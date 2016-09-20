import React from 'react'
import Paper from 'material-ui/Paper'
import MessageIndicator from './MessageIndicator'

const containerStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
}

const paperStyle = {
  maxWidth: '85%',
  padding: '10px',
  margin: '4px 7px',
  borderRadius: '10px',
}

const imageStyle = {
  maxWidth: '100%',
  height: 'auto'
}

const Message = (props, context) => {
  const incomingStyle = {
    marginRight: 'auto'
  }

  const outgoingStyle = {
    backgroundColor: context.muiTheme.palette.primary1Color,
    color: context.muiTheme.palette.alternateTextColor
  }

  const { message } = props

  return (
    <div style={Object.assign({}, props.style, containerStyle)}>
      {message.isMine ? <MessageIndicator message={message} /> : null}
      <Paper style={Object.assign({}, paperStyle, message.isMine ? outgoingStyle : incomingStyle)}>
        {message.type === 'image'
          ? <img style={imageStyle} src={message.imageUrl} />
          : message.text
        }
      </Paper>
    </div>
  )
}

Message.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Message
