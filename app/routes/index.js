/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import Landing from './Landing'
import Home from './Home'
import Conversation from './Conversation'

export default [
  {
    path: '/',
    action: ({ auth }) => new Promise(resolve => {
      if (auth.status === 'signed_in') {
        resolve(<Home />)
      }
      else if (auth.status) {
        resolve(<Landing />)
      }
      else {
        console.log('Hello? What happened?', auth)
      }
    })
  },
  {
    path: '/messages/:chatId',
    action: ({ params }) => new Promise((resolve) => {
      resolve(<Conversation chatId={params.chatId} />)
    })
  }
]
