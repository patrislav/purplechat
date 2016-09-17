import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'

const Chat = (props) => {
  const { chat, ...other } = props

  let lastMessage = ''
  if (chat.lastMessage) {
    lastMessage = chat.lastMessage.text
  }

  return (
    <ListItem
      {...other}
      primaryText={chat.user.displayName}
      secondaryText={lastMessage}
      leftAvatar={<Avatar src={chat.user.photoURL} />}
      />
  )
}

export default Chat
