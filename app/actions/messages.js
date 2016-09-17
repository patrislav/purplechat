import Firebase from 'firebase'
import firebase from 'core/firebase'

export function startMessagesListener(chatId) {
  const messagesRef = firebase.database().ref(`messages/${chatId}`)

  return (dispatch, getState) => {
    messagesRef.on('child_added', messageData => {
      const { auth } = getState()
      const key = messageData.key
      let message = messageData.val()
      message.isMine = message.userId === auth.uid
      dispatch({
        type: 'MESSAGE_ADD',
        key, chatId, message
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
