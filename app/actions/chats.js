import Firebase from 'firebase'
import firebase from 'core/firebase'
import localbase from 'core/localbase'
import {getServerTime} from 'core/utils'

let listenerStarted = false

export function startChatsListener() {
  // Don't start the listener twice
  if (listenerStarted) {
    return () => {}
  }

  return (dispatch, getState) => {
    const { auth } = getState()

    localbase.onChatAdded(auth.uid, chat => {
      const { chatId, userId } = chat

      dispatch({ type: 'CHAT_UPDATE', chat })

      // Called on /users/$userId/connections updates
      // Whenever the user goes online or offline, and on the first load
      const connectionsRef = firebase.database().ref(`users/${userId}/connections`)
      connectionsRef.on('value', snapshot => {
        dispatch({
          type: 'CHAT_UPDATE_PRESENCE',
          chatId, presence: !!snapshot.val()
        })
      })

      // Called on /chats/$chatId/typing/$userId updates
      // Whenever the user is typing
      const TYPING_TRESHOLD = 1000
      let typingTimeout = null
      const typingRef = firebase.database().ref(`chats/${chatId}/typing/${userId}`)
      typingRef.on('value', snapshot => {
        if (snapshot.val()) {
          const difference = getServerTime() - snapshot.val()

          if (difference < TYPING_TRESHOLD) {
            dispatch({
              type: 'CHAT_UPDATE_TYPING',
              chatId, typing: true
            })

            if (typingTimeout) {
              clearTimeout(typingTimeout)
            }

            typingTimeout = setTimeout(() => {
              dispatch({
                type: 'CHAT_UPDATE_TYPING',
                chatId, typing: false
              })
            }, TYPING_TRESHOLD - difference)
          }
        }
      })

      const lastMessageRef = firebase.database().ref(`chats/${chatId}/lastMessage`)
      lastMessageRef.on('value', snapshot => {
        const lastMessage = snapshot.val()
        if (lastMessage.userId === auth.uid) {
          lastMessage.isMine = true
        }

        dispatch({
          type: 'CHAT_UPDATE_LASTMESSAGE',
          chatId, lastMessage
        })
      })
    })

    localbase.onChatChanged(auth.id, chat => {
      dispatch({ type: 'CHAT_UPDATE', chat })
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

export function createChat(email) {
  return (dispatch, getState) => {
    if (email === getState().auth.email) {
      return
    }

    const safeEmail = email.replace(/\./g, '%2E')
    const emailUidRef = firebase.database().ref(`email_uids/${safeEmail}`)
    emailUidRef.once('value', snapshot => {
      if (snapshot.val()) {
        // TODO: Add the conversation
      }
    })
  }
}
