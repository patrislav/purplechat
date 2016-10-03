import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ChatList from 'components/ChatList'
import AddConversationDialog from 'components/AddConversationDialog'
import history from 'core/history'

const actionButtonStyle = {
  position: 'fixed',
  right: '20px',
  bottom: '20px'
}

export default class HomeView extends React.Component {
  state = {
    dialogOpen: false
  }

  render() {
    const { chats, auth } = this.props

    return (
      <div>
        <ChatList chats={chats} auth={auth} onSelect={(chat) => history.push(`/messages/${chat.chatId}`)} />
        <FloatingActionButton style={actionButtonStyle} onClick={this._handleDialogOpen}>
          <ContentAdd />
        </FloatingActionButton>
        {this.state.dialogOpen
          ? <AddConversationDialog
            open={this.state.dialogOpen}
            onRequestClose={this._handleDialogClose}
            onAddConversation={this._handleAddConversation}
            />
          : null}
      </div>
    )
  }

  _handleDialogOpen = () => {
    this.setState({ dialogOpen: true })
  }

  _handleDialogClose = () => {
    this.setState({ dialogOpen: false })
  }

  _handleAddConversation = (email) => {
    this.props.onAddConversation(email)
    this._handleDialogClose()
  }
}
