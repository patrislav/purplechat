import React from 'react'
import Message from './Message'

export default class MessageList extends React.Component {
  componentDidUpdate() {
    const { messages, onReadMessages } = this.props
    const unreadMessages = messages.filter(message => !message.isMine && !message.read)
    
    if (unreadMessages.length > 0 && onReadMessages) {
      onReadMessages(unreadMessages)
    }
  }

  render = () => (
    <div>
      {this.props.messages.map((message) =>
        <Message key={message.key} message={message} />
      )}
    </div>
  )
}
