import Firebase from 'firebase'
import firebase from 'core/firebase'
import {getServerTime} from 'core/utils'

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

        chatRef.child('members').once('value', snapshot => {
          const memberIds = Object.keys(snapshot.val()).filter(uid => uid !== auth.uid)
          const userId = memberIds[0]

          dispatch({
            type: 'CHAT_UPDATE_USERID',
            key: chatId, userId
          })

          // Called on /users/$userId/profile updates
          // Whenever the user changes name or photo url, or on the first user load
          const profileRef = firebase.database().ref(`users/${userId}/profile`)
          profileRef.on('value', snapshot => {
            const displayName = userChatData.val().displayName || snapshot.val().displayName
            const user = Object.assign({}, snapshot.val(), { userId, displayName })

            dispatch({
              type: 'USER_UPDATE',
              userId, user
            })
          })

          // Called on /users/$userId/connections updates
          // Whenever the user goes online or offline, and on the first load
          const connectionsRef = firebase.database().ref(`users/${userId}/connections`)
          connectionsRef.on('value', snapshot => {
            dispatch({
              type: 'USER_PRESENCE_UPDATE',
              userId, presence: !!snapshot.val()
            })
          })

          // Called on /chats/$chatId/typing/$userId updates
          // Whenever the user is typing
          const TYPING_TRESHOLD = 1000
          let typingTimeout = null
          const typingRef = chatRef.child(`typing/${userId}`)
          typingRef.on('value', snapshot => {
            if (snapshot.val()) {
              const difference = getServerTime() - snapshot.val()

              if (difference < TYPING_TRESHOLD) {
                dispatch({
                  type: 'CHAT_UPDATE_TYPING',
                  key: chatId, typing: true
                })

                if (typingTimeout) {
                  clearTimeout(typingTimeout)
                }

                typingTimeout = setTimeout(() => {
                  dispatch({
                    type: 'CHAT_UPDATE_TYPING',
                    key: chatId, typing: false
                  })
                }, TYPING_TRESHOLD - difference)
              }
            }
          })
        })

        chatRef.child('lastMessage').on('value', snapshot => {
          const lastMessage = snapshot.val()
          if (lastMessage.userId === auth.uid) {
            lastMessage.isMine = true
          }

          dispatch({
            type: 'CHAT_UPDATE_LASTMESSAGE',
            key: chatId, lastMessage
          })
        })
      }
    })

    userChatsRef.on('child_changed', userChatData => {
      if (userChatData.val()) {
        const chatId = userChatData.key

        const membersRef = firebase.database().ref(`chats/${chatId}/members`)
        membersRef.once('value', memberData => {
          const memberIds = Object.keys(memberData.val()).filter(uid => uid !== auth.uid)
          const userId = memberIds[0]

          const profileRef = firebase.database().ref(`users/${userId}/profile`)
          profileRef.once('value', snapshot => {
            const displayName = userChatData.val().displayName || snapshot.val().displayName
            const user = Object.assign({}, snapshot.val(), { userId, displayName })
            dispatch({
              type: 'USER_UPDATE',
              userId, user
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
    // const chatsRef = firebase.database().ref('chats')
    // chatsRef.off()
    // listenerStarted = false
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

export function markAsTyping(chatId) {
  return (dispatch, getState) => {
    const { auth } = getState()
    const typingRef = firebase.database().ref(`chats/${chatId}/typing/${auth.uid}`)
    typingRef.set(Firebase.database.ServerValue.TIMESTAMP)
  }
}

export function createChat() {

}
