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

  render() {
    const messages = this.props.messages.map(m => ({ ...m, date: new Date(m.timestamp) }))

    return (
      <div>
        {messages.map((message) =>
          <Message key={message.key} message={message} onLoadAttachment={this.props.onLoadAttachment} />
        )}
      </div>
    )
  }
}
