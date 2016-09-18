import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'

const Chat = ({ chat, auth, ...other }, context) => {
  let lastMessage = ''
  if (chat.lastMessage) {
    lastMessage = <p>
      {chat.lastMessage.isMine ? <span style={{ color: context.muiTheme.palette.textColor }}>You:</span> : null}
      {' '}
      {chat.lastMessage.text}
    </p>
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

Chat.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Chat
