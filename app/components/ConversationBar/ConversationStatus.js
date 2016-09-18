import React from 'react'
import Avatar from 'material-ui/Avatar'
import CircularProgress from 'material-ui/CircularProgress'

const containerStyle = { display: 'flex', height: '100%' }
const avatarStyle = { marginTop: 'auto', marginBottom: 'auto' }
const titleStyle = {
  fontSize: '18px',
  marginTop: 'auto',
  marginBottom: 'auto',
  paddingLeft: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const ConversationStatus = (props) => {
  if (props.chat && props.chat.user) {
    const { displayName, photoURL } = props.chat.user

    return (
      <div style={containerStyle}>
        <Avatar src={photoURL} style={avatarStyle} />
        <h2 style={titleStyle}>{displayName}</h2>
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
