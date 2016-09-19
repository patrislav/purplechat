import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Actions from 'actions'
import {ListItem} from 'material-ui/List'
import {MenuItem} from 'material-ui/Menu'
import Avatar from 'material-ui/Avatar'
import Shell from 'components/Shell'
import AppBar from 'components/AppBar'
import Drawer from 'components/Drawer'
import HomeView from 'components/HomeView'
import firebase from 'core/firebase'

@connect(state => ({
  auth: state.auth,
  chats: state.chats,
  users: state.users
}))
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(Actions, this.props.dispatch)
    this.state = {
      drawerOpen: false
    }
  }

  componentDidMount() {
    this.actions.startChatsListener()
  }

  componentWillUnmount() {
    // this.actions.stopChatsListener()
  }

  render() {
    const { auth, chats, users } = this.props

    const chatsWithUsers = chats
      .map(chat => Object.assign({}, chat, { user: users[chat.userId] }))
      .filter(chat => chat.user)

    return (
      <Shell appBar={<AppBar onLeftIconButtonTouchTap={() => this.setState({drawerOpen: !this.state.drawerOpen})} />}>
        <Drawer open={this.state.drawerOpen} onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
          <ListItem leftAvatar={<Avatar src={auth.photoURL} />}>
            {auth.displayName}
          </ListItem>
          <MenuItem onTouchTap={() => this.actions.signOut()}>Logout</MenuItem>
        </Drawer>
        <HomeView chats={chatsWithUsers} auth={auth} />
      </Shell>
    )
  }
}
