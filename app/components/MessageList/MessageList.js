import React from 'react'
import Message from './Message'

const MessageList = (props) => (
  <div>
    {props.messages.map((message) =>
      <Message key={message.key} message={message} />
    )}
  </div>
)

export default MessageList
