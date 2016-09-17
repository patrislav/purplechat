import firebase from 'core/firebase'

export function startChatsListener() {
  const chatsRef = firebase.database().ref('chats')

  return (dispatch, getState) => {
    chatsRef.on('child_added', chatData => {
      const { auth } = getState()
      const { key } = chatData
      const { members, lastMessage } = chatData.val()
      const memberIds = Object.keys(members).filter(uid => uid !== auth.uid)
      // console.log(memberIds, auth.uid)
      const userId = memberIds[0]
      const profileRef = firebase.database().ref(`users/${userId}/profile`)
      profileRef.once('value', snapshot => {
        const user = Object.assign({}, snapshot.val(), { userId })
        dispatch({
          type: 'CHAT_ADD',
          key, user, lastMessage
        })
      })

    })

    chatsRef.on('child_changed', chatData => {
      const { key } = chatData
      const { lastMessage } = chatData.val()

      dispatch({
        type: 'CHAT_UPDATE',
        key, lastMessage
      })
    })

    // chatsRef.on('child_removed', data => {
    //
    // })
  }
}

export function stopChatsListener() {
  return () => {
    const chatsRef = firebase.database().ref('chats')
    chatsRef.off()
  }
}

export function createChat() {

}
