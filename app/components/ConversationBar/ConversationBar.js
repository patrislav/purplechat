import React from 'react'
import {default as MuiAppBar} from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'

const ConversationBar = (props) => {
  const { onGoBack, ...otherProps } = props

  return (
    <MuiAppBar {...otherProps}
      iconElementLeft={<IconButton onTouchTap={onGoBack}><ArrowBack /></IconButton>}
      iconElementRight={<IconButton onTouchTap={() => {}}><MoreVert /></IconButton>}
      onTitleTouchTap={(event) => console.log(event)}
      />
  )
}

export default ConversationBar
