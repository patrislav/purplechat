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
  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div style={containerStyle}>
        <div ref="messageList" style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <MessageList messages={this.props.messages} />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <MessageComposer onSend={this.props.onSendMessage} />
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    // Scroll to the bottom
    this.refs.messageList.scrollTop = this.refs.messageList.scrollHeight
  }
}
