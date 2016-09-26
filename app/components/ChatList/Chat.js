import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
import {darkBlack, green600} from 'material-ui/styles/colors'
import AttachmentIcon from 'material-ui/svg-icons/file/attachment'

const Chat = ({ chat, auth, ...other }, context) => {
  let lastMessage = ''
  if (chat.lastMessage) {
    lastMessage = <p>
      {chat.lastMessage.isMine ? <span style={{ color: context.muiTheme.palette.textColor }}>You:</span> : null}
      {' '}
      {chat.lastMessage.type === 'image'
        ? <span style={{ fontStyle: 'italic' }}>
            <AttachmentIcon style={{ width: '12px', height: '12px' }} /> Attachment
          </span>
        : chat.lastMessage.text
      }
    </p>
  }

  const onlineIndicator = (
    chat.presence
      ? <span style={{ color: green600, fontSize: '1.1em' }}>&bull;</span>
      : null
  )

  return (
    <ListItem
      {...other}
      primaryText={<span>{chat.displayName} {onlineIndicator}</span>}
      secondaryText={lastMessage}
      leftAvatar={<Avatar src={chat.photoURL} />}
      />
  )
}

Chat.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Chat
