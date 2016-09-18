import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ChatList from 'components/ChatList'
import history from 'core/history'

const actionButtonStyle = {
  position: 'fixed',
  right: '20px',
  bottom: '20px'
}

const HomeView = ({ chats, auth }) => (
  <div>
    <ChatList chats={chats} auth={auth} onSelect={(chat) => history.push(`/messages/${chat.key}`)} />
    <FloatingActionButton style={actionButtonStyle}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default HomeView
