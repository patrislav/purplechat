import React from 'react'
import MessageList from 'components/MessageList'
import MessageComposer from 'components/MessageComposer'

const containerStyle = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}

export default class ConversationView extends React.Component {

  render() {
    const { messages, onSendMessage, onReadMessages, onTyping } = this.props

    return (
      <div style={containerStyle}>
        <div ref={c => this.messageList = c} style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <MessageList messages={messages} onReadMessages={onReadMessages} />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <MessageComposer onSend={onSendMessage} onChange={onTyping} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messageList.scrollTop = this.messageList.scrollHeight
  }
}
