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

const chats = [
  {
    id: 'aaa',
    name: 'Satan',
    lastMessage: 'How many times do I have to tell you people that I am not Santa?!',
    avatarUrl: "http://wp.patheos.com.s3.amazonaws.com/blogs/christianpiatt/files/2013/02/southpark-satan-300x300.png"
  }
]

const HomeView = () => (
  <div>
    <ChatList chats={chats} onSelect={(chat) => history.push(`/messages/${chat.id}`)} />
    <FloatingActionButton style={actionButtonStyle}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
)

export default HomeView
