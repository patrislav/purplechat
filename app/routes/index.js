/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import Landing from './Landing'
import Home from './Home'
import Conversation from './Conversation'
// TODO Remove this testing thing
import Upload from './Upload'

export default [
  {
    path: '/',
    action: ({ auth }) => new Promise((resolve, reject) => {
      if (auth.status === 'signed_in') {
        resolve(<Home />)
      }
      else if (auth.status) {
        resolve(<Landing />)
      }
      else {
        reject(404)
      }
    })
  },
  {
    path: '/messages/:chatId',
    action: ({ params }) => new Promise((resolve) => {
      resolve(<Conversation chatId={params.chatId} />)
    })
  },
  // TODO Remove this testing thing
  {
    path: '/upload',
    action: () => new Promise(resolve => resolve(<Upload />))
  }
]
