import React from 'react'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import emoji from '../../lib/emoji'

/*
editor/insert-emoticon
image/filter-vintage
maps/local-pizza
social/notifications
maps/directions-run
maps/directions-car
*/

const tabStyle = {display: 'flex', flexWrap: 'wrap', width: '100%', overflowY: 'auto'}
const elementStyle = {
  fontSize: '32px',
  width: null, height: null,
  flex: '1 1 auto'
}

export default class EmojiGrid extends React.Component {
  constructor(props) {
    super(props)

    this.characters = {}
    Object.keys(emoji.emojiList).forEach(category => {
      this.characters[category] = emoji.emojiList[category].map(code => String.fromCodePoint(parseInt(code, 16)))
    })
  }

  render() {
    const { onSelect, category } = this.props

    return (
      <div>
        {Object.keys(emoji.emojiList).map(tabCategory =>
          <div key={tabCategory} style={Object.assign({}, tabStyle, { display: category === tabCategory ? tabStyle.display : 'none' })}>
            {this.characters[tabCategory].map((char, i) =>
              <IconButton key={i} style={elementStyle} onTouchTap={() => onSelect(char)}>
                {char}
              </IconButton>
            )}
          </div>
        )}
      </div>
    )
  }
}
