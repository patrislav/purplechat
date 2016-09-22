import React from 'react'
import MessagePaper from './MessagePaper'
import MessageTimestamp from './MessageTimestamp'
import MessageIndicator from './MessageIndicator'

const containerStyle = {
  width: '100%'
}

const elementStyle = {
  display: 'flex',
  alignItems: 'center'
}

const Message = (props, context) => {
  const { message, ...otherProps } = props

  return (
    <div style={Object.assign({}, props.style, containerStyle)}>
      <div style={{ margin: '7px 4px' }}>
        <MessageTimestamp message={message} />

        <div style={Object.assign({}, elementStyle, {justifyContent: message.isMine ? 'flex-end' : 'flex-start'})}>
          {message.isMine ? <MessageIndicator message={message} /> : null}
          <MessagePaper message={message} {...otherProps} />
        </div>
      </div>
    </div>
  )
}

Message.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Message
