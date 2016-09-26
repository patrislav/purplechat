import React from 'react'
import Firebase from 'firebase'
import Avatar from 'material-ui/Avatar'
import CircularProgress from 'material-ui/CircularProgress'
import {ListItem} from 'material-ui/List'
import {green600, grey300} from 'material-ui/styles/colors'

const containerStyle = { display: 'flex', height: '100%', lineHeight: 'normal' }
const avatarStyle = { marginTop: 'auto', marginBottom: 'auto' }
const titleStyle = {
  fontSize: '18px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  margin: 0
}

const ConversationStatus = ({ chat }) => {
  if (chat) {
    const { displayName, photoURL, presence } = chat
    const secondaryText = presence ? (chat.typing ? 'typing...' : 'online now') : 'offline'

    return (
      <div style={containerStyle}>
        <Avatar src={photoURL} style={avatarStyle} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
          <h2 style={titleStyle}>{displayName}</h2>
          <div style={{ fontSize: '12px', color: grey300 }}>{secondaryText}</div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div style={containerStyle}>
        <CircularProgress size={0.5} color="#fff" style={{ margin: 'auto' }} />
      </div>
    )
  }

}

export default ConversationStatus
