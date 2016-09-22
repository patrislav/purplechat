import React from 'react'
import Timestamp from 'components/Timestamp'


const MessageTimestamp = (props) => {
  const { date, isMine } = props.message

  const style = {
    fontSize: '0.75em',
    color: '#999',
    textAlign: isMine ? 'right' : 'left',
    marginLeft: '10px',
    marginRight: '10px'
  }

  return (
    <div style={Object.assign({}, style, props.style)}>
      <Timestamp timestamp={date} type="datetime" />
    </div>
  )
}

export default MessageTimestamp
