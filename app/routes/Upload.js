import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Actions from 'actions'

import Shell from 'components/Shell'
import UploadPicture from 'components/AttachFile/UploadPicture'

@connect(state => ({
  // auth: state.auth,
  // chats: state.chats,
  // users: state.users
}))
export default class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(Actions, this.props.dispatch)
  }

  render() {
    return (
      <Shell>
        <UploadPicture />
      </Shell>
    )
  }
}
