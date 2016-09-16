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
  constructor() {
    super()
    this.state = {
      messages: [
        { incoming: false, text: "This is a message" },
        { incoming: false, text: "Another one!" },
        { incoming: true, text: "And this is a response! Hey! A long response. Very loooooooooong. Yes, it is."}
      ]
    }
  }

  render() {
    return (
      <div style={containerStyle}>
        <div ref="messageList" style={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <MessageList messages={this.state.messages} />
        </div>
        <div style={{ flex: '0 0 auto' }}>
          <MessageComposer onSend={this._addMessage} />
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    // Scroll to the bottom
    this.refs.messageList.scrollTop = this.refs.messageList.scrollHeight
  }

  _addMessage = (text) => {
    this.setState({
      ...this.state,
      messages: [
        ...this.state.messages,
        {
          incoming: false,
          text
        }
      ]
    })
  }
}
