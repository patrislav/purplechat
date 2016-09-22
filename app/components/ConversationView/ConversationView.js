import React from 'react'
import MessageList from 'components/MessageList'
import MessageComposer from 'components/MessageComposer'
import EmojiGrid from 'components/MessageComposer/EmojiGrid'

const containerStyle = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}

export default class ConversationView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emojiGridOpen: false
    }
  }

  render() {
    const { messages, onSendMessage, onSendPicture, onReadMessages, onTyping, ...otherProps } = this.props

    return (
      <div style={containerStyle}>
        <div ref={c => this.messageList = c} style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <MessageList
            messages={messages}
            onReadMessages={onReadMessages}
            onLoadAttachment={() => this.scrollToBottom()}
            />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <MessageComposer
            onSendMessage={onSendMessage}
            onSendPicture={onSendPicture}
            onChange={onTyping}
            {...otherProps}
            />
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
