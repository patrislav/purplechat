import React from 'react'
import TextField from 'material-ui/TextField'

export default class MessageInput extends React.Component {
  render() {
    // const { onChange, onKeyDown, value } = this.props
    return (
      <TextField
        ref={c => this.input = c}
        hintText="Write your message..."
        multiLine={true}
        rowsMax={4}
        fullWidth={true}
        {...this.props}
        />
    )
  }

  focus() {
    if (this.input) {
      this.input.focus()
    }
  }
}
