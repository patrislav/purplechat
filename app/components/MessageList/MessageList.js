import React from 'react'
import Message from './Message'

const MessageList = (props) => (
  <div>
    {props.messages.map((message, i) =>
      <Message key={i} incoming={message.incoming}>{message.text}</Message>
    )}
  </div>
)

export default MessageList
