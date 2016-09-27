import firebase from 'core/firebase'
import idb from 'idb'

export default { onChatAdded, onChatChanged }

/**
purplechat-chats
{
  chatId: "...",
  userId: "...",
  displayName: "...",
  photoURL: "..."
}

purplechat-messages
{
  messageId: "...",
  chatId: "...",
  userId: "...",
  type: "...",
  ....
}
**/

function onChatAdded(currentUserId, callback) {
  const storeName = 'purplechat-chats'
  const dbPromise = openChatDB(storeName)

  // Get the chats one by one
  dbPromise.then(db => {
    const store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    store.getAll().then(chats => chats.forEach(chat => {
      callback(chat)
    }))
  })

  // Get the new chats from Firebase
  const userChatsRef = firebase.database().ref(`users/${currentUserId}/chats`)
  userChatsRef.on('child_added', userChatData => {
    const userChat = userChatData.val()
    const chatId = userChatData.key

    const chatRef = firebase.database().ref(`chats/${chatId}`)
    chatRef.child('members').once('value', snapshot => {
      const memberIds = Object.keys(snapshot.val()).filter(uid => uid !== currentUserId)
      const userId = memberIds[0]

      const profileRef = firebase.database().ref(`users/${userId}/profile`)
      profileRef.on('value', snapshot => {
        const user = snapshot.val()
        const displayName = userChat.displayName || user.displayName

        // FINALLY got enough info to be able to populate the chat
        const chat = {
          chatId, userId, displayName, photoURL: user.photoURL
        }

        // Let's immediately return the chat object
        callback(chat)

        // And now let's save it!
        saveChat(dbPromise, storeName, chat)
      })
    })
  })
}

function onChatChanged(currentUserId, callback) {
  const storeName = 'purplechat-chats'
  const dbPromise = openChatDB(storeName)

  const userChatsRef = firebase.database().ref(`users/${currentUserId}/chats`)
  userChatsRef.on('child_changed', userChatData => {
    const userChat = userChatData.val()
    const chatId = userChatData.key

    const membersRef = firebase.database().ref(`chats/${chatId}/members`)
    membersRef.once('value', memberData => {
      const memberIds = Object.keys(memberData.val()).filter(uid => uid !== currentUserId)
      const userId = memberIds[0]

      const profileRef = firebase.database().ref(`users/${userId}/profile`)
      profileRef.once('value', snapshot => {
        const user = snapshot.val()
        const displayName = userChat.displayName || user.displayName

        // FINALLY got enough info to be able to populate the chat
        const chat = {
          chatId, userId, displayName, photoURL: user.photoURL
        }

        callback(chat)

        saveChat(dbPromise, storeName, chat)
      })
    })
  })
}


function openChatDB(storeName) {
  return idb.open(storeName, 1, upgradeDB => {
    switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore(storeName, { keyPath: 'chatId' })
    }
  })
}

function saveChat(dbPromise, storeName, chat) {
  dbPromise.then(db => {
    const readStore = db.transaction(storeName, 'readonly').objectStore(storeName)
    readStore.get(chat.chatId)
      .then(dbChat => {
        const saveStore = db.transaction(storeName, 'readwrite').objectStore(storeName)
        if (dbChat) {
          // The chat already exists in the IDB
          saveStore.put(chat)
        }
        else {
          saveStore.add(chat)
        }
      })
  })
}
