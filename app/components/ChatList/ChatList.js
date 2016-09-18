import React from 'react'
import Chat from './Chat'
import {List} from 'material-ui/List'

const ChatList = ({ chats, auth, onSelect }) => (
  <List>
    {chats.map((chat, i) =>
      <Chat key={i} chat={chat} auth={auth} onTouchTap={() => onSelect(chat)} />
    )}
  </List>
)

export default ChatList
