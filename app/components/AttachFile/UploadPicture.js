import React from 'react'
import { uploadImage } from 'actions/attachments'

export default class UploadPicture extends React.Component {
  render() {
    return (
      <div>
        <input
          ref={c => this.input = c}
          type="file"
          onChange={this._handleChange}
          accept="image/*"
          // capture="camera"
          />
      </div>
    )
  }

  _handleChange = () => {
    const file = this.input.files[0]
    const { path, basename, onUpload } = this.props
    uploadImage(file, path, basename, onUpload)
  }
}
