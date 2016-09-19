import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Actions from 'actions'
import Shell from 'components/Shell'
import ConversationView from 'components/ConversationView'
import ConversationBar from 'components/ConversationBar'
import history from 'core/history'
import firebase from 'core/firebase'

@connect((state, ownProps) => ({
  userId: state.auth.uid,
  chat: state.chats.find(chat => chat.key === ownProps.chatId),
  allUsers: state.users,
  allMessages: state.messages
}))
export default class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(Actions, this.props.dispatch)
  }

  componentDidMount() {
    this.actions.startChatsListener()
    this.actions.startMessagesListener(this.props.chatId)
  }

  componentWillUnmount() {
    this.actions.stopMessagesListener(this.props.chatId)
  }

  render() {
    const { chatId, chat, allMessages, allUsers } = this.props
    const messages = allMessages[chatId] || []

    if (chat) {
      chat.user = allUsers[chat.userId]
    }

    const appBar = (
      <ConversationBar
        chat={chat}
        onGoBack={() => history.push('/')}
        onChangeName={this._handleChangeName}
        onRestoreDefaultName={this._handleRestoreDefaultName}
        />
    )

    return (
      <Shell appBar={appBar}>
        <ConversationView
          messages={messages}
          onSendMessage={this._handleSendMessage}
          onReadMessages={this._handleReadMessages}
          onTyping={this._handleTyping}
          />
      </Shell>
    )
  }

  _handleSendMessage = (text) => {
    const { userId, chatId } = this.props
    this.actions.sendMessage(chatId, userId, text)
  }

  _handleReadMessages = (messages) => {
    this.actions.markMessagesAsRead(this.props.chatId, messages)
  }

  _handleTyping = () => {
    this.actions.markAsTyping(this.props.chatId)
  }

  _handleChangeName = (newName) => {
    this.actions.changeChatName(this.props.chatId, newName)
  }

  _handleRestoreDefaultName = () => {
    this.actions.restoreDefaultChatName(this.props.chatId)
  }
}

export default Conversation
