import React from 'react'
import Avatar from 'material-ui/Avatar'
import {ListItem} from 'material-ui/List'
import {darkBlack, green600} from 'material-ui/styles/colors'
import AttachmentIcon from 'material-ui/svg-icons/file/attachment'
import Timestamp from 'components/Timestamp'

const Chat = ({ chat, auth, ...other }, context) => {
  let lastMessage = ''
  let timestamp = ''

  if (chat.lastMessage) {
    timestamp = <Timestamp type="date"
      timestamp={new Date(chat.lastMessage.timestamp)}
      style={{ float: 'right', fontSize: '0.75rem', color: context.muiTheme.palette.secondaryTextColor }}
      />
  }

  if (chat.typing) {
    lastMessage = <p style={{ fontStyle: 'italic' }}>Typing...</p>
  }
  else if (chat.lastMessage) {
    lastMessage = (
      <p>
        {chat.lastMessage.isMine ? <span style={{ color: context.muiTheme.palette.textColor }}>You:</span> : null}
        {' '}
        {chat.lastMessage.type === 'image'
          ? <span style={{ fontStyle: 'italic' }}>
              <AttachmentIcon style={{ width: '12px', height: '12px' }} /> Attachment
            </span>
          : chat.lastMessage.text
        }
      </p>
    )
  }

  const onlineIndicator = (
    chat.presence
      ? <span style={{ color: green600, fontSize: '1.1em' }}>&bull;</span>
      : null
  )

  return (
    <ListItem
      {...other}
      secondaryText={lastMessage}
      leftAvatar={<Avatar src={chat.photoURL} />}
      primaryText={
        <div>
          <span>{chat.displayName} {onlineIndicator}</span>
          <span>{timestamp}</span>
        </div>
      }
      />
  )
}

Chat.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default Chat
