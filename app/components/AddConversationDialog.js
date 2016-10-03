import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class ChangeChatNameDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    const { open, onAddConversation, onRequestClose } = this.props

    const actions = [
      <FlatButton
        label="Send"
        primary={true}
        onTouchTap={() => onAddConversation(this.state.value)}
      />
    ]

    return (
      <Dialog
        title="Write a new message"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
        >
        <TextField
          hintText="Recipient's email"
          value={this.state.value}
          onChange={this._handleChange}
          style={{ width: '100%' }}
          autoFocus={true}
        />
      </Dialog>
    )
  }

  _handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }
}
