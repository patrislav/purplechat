import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'

const Chat = (props) => {
  const { chat, ...other } = props

  return (
    <ListItem
      {...other}
      primaryText={chat.name}
      secondaryText={chat.lastMessage}
      leftAvatar={<Avatar src={chat.avatarUrl} />}
      />
  )
}

export default Chat
