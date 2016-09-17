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

const HomeView = ({ chats }) => (
  <div>
    <ChatList chats={chats} onSelect={(chat) => history.push(`/messages/${chat.id}`)} />
    <FloatingActionButton style={actionButtonStyle}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default HomeView
