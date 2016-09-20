import React from 'react'
import UploadPicture from './UploadPicture'

export default class AttachFile extends React.Component {
  constructor(props) {
    super(props)

    const { userId, chatId } = props
    this.path = `uploads/${chatId}/${userId}`
    this.basename = Math.random().toString(36).slice(2)

    this.state = {
      status: 'idle',
      progress: 0
    }
  }

  render() {
    const { status, progress } = this.state

    return (
      <div style={{ padding: '30px' }}>
        {status === 'uploading'
          ? <span>Uploading... {progress}%</span>
          : <UploadPicture path={this.path} basename={this.basename} onUpload={this._handleUpload} />
        }
      </div>
    )
  }

  _handleUpload = (uploadTask) => {
    this.setState({ ...this.state, status: 'uploading', progress: 0 })

    uploadTask.on('state_changed', {
      next: (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
        this.setState({
          ...this.state, progress
        })
      },
      complete: (snapshot) => {
        this.setState({ ...this.state, status: 'idle', progress: 0 })
        this.props.onSendPicture(uploadTask.snapshot)
      }
    })
  }
}
