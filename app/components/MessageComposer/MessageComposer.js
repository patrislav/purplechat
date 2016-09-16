import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import InsertEmoticon from 'material-ui/svg-icons/editor/insert-emoticon'

const style = {
  paddingLeft: '5px',
  paddingRight: '5px',
  display: 'flex'
}

export default class MessageComposer extends React.Component {

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    onSend: PropTypes.func.isRequired,
    onChange: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <Paper style={Object.assign({}, this.props.style, style)}>
        <TextField
          ref="messageTextField"
          hintText="Write your message..."
          multiLine={true}
          rowsMax={4}
          fullWidth={true}
          onChange={(e, value) => this.setState({ value })}
          onKeyDown={this._handleKeyDown}
          value={this.state.value}
          />
        <IconButton>
          <InsertEmoticon color={this.context.muiTheme.palette.primary3Color} />
        </IconButton>
        <IconButton onTouchTap={this._handleSend}>
          <ContentSend color={this.context.muiTheme.palette.primary1Color} />
        </IconButton>
      </Paper>
    )
  }

  _handleChange = (event, value) => {
    this.setState({ value })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  _handleSend = (event) => {
    if (this.state.value) {
      this.setState({ value: '' })
      this.props.onSend(this.state.value)
    }

    event.preventDefault()
    this.refs.messageTextField.focus()
  }

  _handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      this._handleSend(event)
    }
  }

}
