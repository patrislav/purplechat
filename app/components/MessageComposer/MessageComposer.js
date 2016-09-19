import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentSend from 'material-ui/svg-icons/content/send'
import InsertEmoticon from 'material-ui/svg-icons/editor/insert-emoticon'
import KeyboardIcon from 'material-ui/svg-icons/hardware/keyboard'
import MessageInput from './MessageInput'
import EmojiGrid from './EmojiGrid'

const containerStyle = {
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

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      emojiCategory: 'people',
      emojiGridOpen: false
    }
  }

  componentDidMount() {
    // this.initialWindowHeight = window.innerHeight
  }

  render() {
    const { style, onToggleEmojiGrid } = this.props
    const { emojiGridOpen, emojiCategory, value } = this.state
    const { muiTheme } = this.context

    /// Nice transition effects for the EmojiGrid (not included, because the element
    /// flashes on load)
    // const gridStyle = emojiGridOpen
    //   ? {
    //     flex: '1 1 auto',
    //     overflowY: 'auto',
    //     minHeight: '200px',
    //     transition: 'all cubic-bezier(0, 1, 0.5, 1) 0.5s'
    //   }
    //   : {
    //     flex: '1 1 auto',
    //     overflowY: 'auto',
    //     minHeight: '0',
    //     height: '0',
    //     transition: 'all cubic-bezier(0, 1, 0.5, 1) 0.5s'
    //   }

    const emojiGridStyle = {
      overflowY: 'auto',
      height: `${window.innerHeight * 0.5}px`
    }

    return (
      <div>
        <Paper style={Object.assign({}, style, containerStyle)}>
          <MessageInput
            ref={c => this.messageInput = c}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyDown}
            onFocus={this._handleInputFocus}
            value={value}
            />
          <IconButton onTouchTap={this._handleToggleEmojiGrid}>
            {emojiGridOpen
              ? <KeyboardIcon color={muiTheme.palette.primary3Color} />
              : <InsertEmoticon color={muiTheme.palette.primary3Color} />
            }
          </IconButton>
          <IconButton onTouchTap={this._handleSend}>
            <ContentSend color={muiTheme.palette.primary1Color} />
          </IconButton>
        </Paper>
        <div style={{display: (emojiGridOpen ? 'block' : 'none')}}>
          <div style={emojiGridStyle}>
            <EmojiGrid onSelect={this._handleEmojiSelect} category={emojiCategory} />
          </div>
          {/* TODO <EmojiCategoryPicker currentCategory={emojiCategory} /> */}
        </div>
      </div>
    )
  }

  _handleChange = (event, value) => {
    this.setState({ ...this.state, value })

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  _handleSend = (event) => {
    if (this.state.value) {
      this.setState({ ...this.state, value: '' })
      this.props.onSend(this.state.value)
    }

    event.preventDefault()
    // this.messageInput.focus()
  }

  _handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      this._handleSend(event)
    }
  }

  _handleToggleEmojiGrid = (event) => {
    this.setState({
      ...this.state,
      emojiGridOpen: !this.state.emojiGridOpen
    })

    if (this.state.emojiGridOpen) {
      event.preventDefault()
      this.messageInput.focus()
    }

    // This is a hack because of soft keyboard behaviour on mobile
    if (window.innerHeight != this.initialWindowHeight) {
      let height = window.innerHeight
      let interval = setInterval(() => {
        if (window.innerHeight != height) {
          this.forceUpdate()
          clearInterval(interval)
        }
      }, 100)
    }
  }

  // TODO: Insert the character at caret instead of attaching it at the end of
  // the value string
  _handleEmojiSelect = (emoji) => {
    const value = this.state.value + emoji
    this.setState({
      ...this.state,
      value
    })
  }

  _handleInputFocus = () => {
    this.setState({
      ...this.state,
      emojiGridOpen: false
    })
  }

}
