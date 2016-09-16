/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react'
import Landing from './Landing'
import Home from './Home'
import Conversation from './Conversation'

export default [
  {
    path: '/',
    action: () => <Landing />
  },
  {
    path: '/messages',
    action: () => <Home />
  },
  {
    path: '/messages/:convoId',
    action: ({ params }) => new Promise((resolve) => {
      setTimeout(() => resolve(<Conversation convoId={params.convoId} />), 500)
    })
  }
]
