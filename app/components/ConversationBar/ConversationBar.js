import React from 'react'
import {default as MuiAppBar} from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import MoreVert from 'material-ui/svg-icons/navigation/more-vert'
import ConversationStatus from './ConversationStatus'
import ChangeChatNameDialog from 'components/ChangeChatNameDialog'

export default class ConversationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false
    }
  }

  render() {
    const { onGoBack, chat, onChangeName, onRestoreDefaultName, ...otherProps } = this.props

    const detailsMenu = (
      <IconMenu
        iconButtonElement={<IconButton><MoreVert /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <MenuItem primaryText="Change name" onTouchTap={this._handleDialogOpen} />
      </IconMenu>
    )

    return (
      <div>
        <MuiAppBar {...otherProps}
          title={<ConversationStatus chat={chat} />}
          iconElementLeft={<IconButton onTouchTap={onGoBack}><ArrowBack /></IconButton>}
          iconElementRight={detailsMenu}
          onTitleTouchTap={(event) => console.log(event)}
        />
        {chat && this.state.dialogOpen
          ? <ChangeChatNameDialog
            open={this.state.dialogOpen}
            currentName={chat.displayName}
            onRequestClose={this._handleDialogClose}
            onChangeName={this._handleChangeName}
            onRestoreDefault={this._handleRestoreDefault}
            />
          : null}
      </div>
    )
  }

  _handleDialogOpen = () => {
    this.setState({
      dialogOpen: true
    })
  }

  _handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  _handleChangeName = (newName) => {
    this.props.onChangeName(newName)
    this._handleDialogClose()
  }

  _handleRestoreDefault = () => {
    this.props.onRestoreDefaultName()
    this._handleDialogClose()
  }
}
