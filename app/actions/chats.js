import firebase from 'core/firebase'

/**
  TODO
  This model changed. Now each user has the list of their chats at /users/$uid/chats
  Then a separate reference must be created for each /chats/$chatId node

  /users
    /$uid
      /chats
        /$chatId: true

  /chats
    /$chatId


 */

let listenerStarted = false

export function startChatsListener() {
  // Don't start the listener twice
  if (listenerStarted) {
    return () => {}
  }

  return (dispatch, getState) => {
    const { auth } = getState()
    const userChatsRef = firebase.database().ref(`users/${auth.uid}/chats`)

    userChatsRef.on('child_added', userChatData => {
      if (userChatData.val()) {
        const chatId = userChatData.key
        const chatRef = firebase.database().ref(`chats/${chatId}`)

        chatRef.once('value', chatData => {
          const { members, lastMessage } = chatData.val()
          if (lastMessage) {
            lastMessage.isMine = lastMessage.userId === auth.uid
          }

          const memberIds = Object.keys(members).filter(uid => uid !== auth.uid)
          const userId = memberIds[0]
          const profileRef = firebase.database().ref(`users/${userId}/profile`)
          profileRef.once('value', snapshot => {
            const displayName = userChatData.val().displayName || snapshot.val().displayName
            const user = Object.assign({}, snapshot.val(), { userId, displayName })
            dispatch({
              type: 'CHAT_ADD',
              key: chatId, user, lastMessage
            })
          })
        })
      }
    })

    userChatsRef.on('child_changed', userChatData => {
      if (userChatData.val()) {
        const chatId = userChatData.key
        const chatRef = firebase.database().ref(`chats/${chatId}`)

        chatRef.once('value', chatData => {
          const { members } = chatData.val()
          const memberIds = Object.keys(members).filter(uid => uid !== auth.uid)
          const userId = memberIds[0]
          const profileRef = firebase.database().ref(`users/${userId}/profile`)
          profileRef.once('value', snapshot => {
            const displayName = userChatData.val().displayName || snapshot.val().displayName
            const user = Object.assign({}, snapshot.val(), { userId, displayName })
            dispatch({
              type: 'CHAT_UPDATE',
              key: chatId, user
            })
          })
        })
      }
    })

    listenerStarted = true
  }
}

export function stopChatsListener() {
  return () => {
    const chatsRef = firebase.database().ref('chats')
    chatsRef.off()
    listenerStarted = false
  }
}

export function changeChatName(chatId, displayName) {
  return (dispatch, getState) => {
    const { auth } = getState()
    const userChatRef = firebase.database().ref(`users/${auth.uid}/chats/${chatId}`)
    userChatRef.update({ displayName })
  }
}

export function restoreDefaultChatName(chatId) {
  return (dispatch, getState) => {
    const { auth } = getState()
    firebase.database().ref(`users/${auth.uid}/chats/${chatId}/displayName`).remove()
  }
}

export function createChat() {

}
