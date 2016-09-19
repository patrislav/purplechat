import Firebase from 'firebase'
import firebase from 'core/firebase'

let messageQueues = {}
let queueTimeouts = {}

export function addMessageToQueue(chatId, message, dispatch) {
  if (!messageQueues.hasOwnProperty(chatId)) {
    messageQueues[chatId] = [message]
  }
  else {
    messageQueues[chatId].push(message)
  }

  if (queueTimeouts[chatId]) {
    return
  }

  queueTimeouts[chatId] = setTimeout(((dispatch, chatId) => {
    dispatch({
      type: 'MESSAGES_LOAD',
      chatId, messages: messageQueues[chatId]
    })
    messageQueues[chatId] = []
    queueTimeouts[chatId] = null
  }).bind(null, dispatch, chatId), 50)
}

export function startMessagesListener(chatId) {
  const messagesRef = firebase.database().ref(`messages/${chatId}`)

  return (dispatch, getState) => {
    messagesRef.on('child_added', messageData => {
      const { auth } = getState()
      const key = messageData.key
      let message = Object.assign({},
        messageData.val(),
        { key, isMine: messageData.val().userId === auth.uid }
      )

      if (!message.isMine) {
        dispatch({
          type: 'CHAT_UPDATE_TYPING',
          key: chatId, typing: false
        })
      }

      addMessageToQueue(chatId, message, dispatch)
    })

    messagesRef.on('child_changed', messageData => {
      const { auth } = getState()
      const key = messageData.key
      let message = Object.assign({},
        messageData.val(),
        { key, isMine: messageData.val().userId === auth.uid }
      )

      dispatch({
        type: 'MESSAGE_UPDATE',
        chatId, message
      })
    })
  }
}

export function stopMessagesListener(chatId) {
  const messagesRef = firebase.database().ref(`messages/${chatId}`)

  return () => {
    messagesRef.off()
  }
}

export function sendMessage(chatId, userId, text) {
  const messagesRef = firebase.database().ref(`messages/${chatId}`)
  const lastMessageRef = firebase.database().ref(`chats/${chatId}/lastMessage`)
  const message = { userId, text, timestamp: Firebase.database.ServerValue.TIMESTAMP }

  return () => {
    messagesRef.push(message)
    lastMessageRef.set(message)
  }
}

export function markMessagesAsRead(chatId, messages) {
  const messagesRef = firebase.database().ref(`messages/${chatId}`)

  return () => {
    let updates = {}
    messages.forEach(message => updates[`${message.key}/read`] = Firebase.database.ServerValue.TIMESTAMP)
    messagesRef.update(updates)
  }
}
