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
    })
  },
  {
    path: '/messages/:chatId',
    action: ({ params }) => new Promise((resolve) => {
      setTimeout(() => resolve(<Conversation chatId={params.chatId} />), 500)
    })
  }
]
