import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Actions from 'actions'
import Shell from 'components/Shell'
import ConversationView from 'components/ConversationView'
import ConversationBar from 'components/ConversationBar'
import history from 'core/history'
import firebase from 'core/firebase'

@connect(state => ({
  userId: state.auth.uid,
  allMessages: state.messages
}))
export default class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(Actions, this.props.dispatch)
  }

  componentDidMount() {
    this.actions.startMessagesListener(this.props.chatId)
  }

  componentWillUnmount() {
    this.actions.stopMessagesListener(this.props.chatId)
  }

  render() {
    const { allMessages, chatId } = this.props
    const chatMessages = allMessages[chatId] || []

    return (
      <Shell appBar={<ConversationBar title="Conversation" onGoBack={() => history.push('/')} />}>
        <ConversationView {...this.props} messages={chatMessages} onSendMessage={this._handleSendMessage} />
      </Shell>
    )
  }

  _handleSendMessage = (text) => {
    const { userId, chatId } = this.props
    this.actions.sendMessage(chatId, userId, text)
  }
}

export default Conversation
