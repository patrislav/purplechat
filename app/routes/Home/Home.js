import React from 'react'
import {connect} from 'react-redux'
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
  chats: []
}))
export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      drawerOpen: false
    }
  }

  render() {
    const { auth, chats } = this.props

    return (
      <Shell appBar={<AppBar onLeftIconButtonTouchTap={() => this.setState({drawerOpen: !this.state.drawerOpen})} />}>
        <Drawer open={this.state.drawerOpen} onRequestChange={(drawerOpen) => this.setState({drawerOpen})}>
          <ListItem leftAvatar={<Avatar src={auth.photoURL} />}>
            {auth.displayName}
          </ListItem>
          <MenuItem onTouchTap={() => firebase.auth().signOut()}>Logout</MenuItem>
        </Drawer>
        <HomeView chats={chats} />
      </Shell>
    )
  }
}
