import React from 'react'
import Chat from './Chat'
import {List} from 'material-ui/List'

const ChatList = (props) => (
  <List>
    {props.chats.map((chat, i) =>
      <Chat key={i} chat={chat} onTouchTap={() => props.onSelect(chat)} />
    )}
  </List>
)

export default ChatList
