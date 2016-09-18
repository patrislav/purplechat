import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class ChangeChatNameDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.currentName
    }
  }

  render() {
    const { open, onRestoreDefault, onChangeName, onRequestClose } = this.props

    const actions = [
      <FlatButton
        label="Restore default"
        primary={true}
        onTouchTap={() => onRestoreDefault()}
      />,
      <FlatButton
        label="Change"
        primary={true}
        onTouchTap={() => onChangeName(this.state.value)}
      />
    ]

    return (
      <Dialog
        title="Change name"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
        >
        <TextField
          hintText="Enter new chat name..."
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
