import Firebase from 'firebase'
import firebase from 'core/firebase'
import { initialisePush } from './notifications'

let currentConnectionId = null

export function startAuthListener() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL, email } = user
        dispatch({
          type: 'LOGIN',
          uid, displayName, photoURL
        })

        initialisePush()(dispatch, getState)

        // If the user doesn't exist in the /users/$uid/profile node, create it
        const profileRef = firebase.database().ref(`users/${uid}/profile`)
        profileRef.once('value', snapshot => {
          const val = snapshot.val()
          if (!val) {
            const updates = {}
            updates[`users/${uid}/profile`] = { displayName, photoURL }
            updates[`email_uids/${email.replace(/\./g, '%2E')}`] = uid
            firebase.database().ref().update(updates)
          }
        })

        // Handle online status
        const myConnectionsRef = firebase.database().ref(`users/${uid}/connections`)
        const lastOnlineRef = firebase.database().ref(`users/${uid}/lastOnline`)
        const connectedRef = firebase.database().ref('.info/connected')
        connectedRef.off('value')
        connectedRef.on('value', connected => {
          if (connected.val() === true) {
            if (currentConnectionId) {
              let conRef = myConnectionsRef.child(currentConnectionId)
              conRef.set(true)
              conRef.onDisconnect().remove()
            }
            else {
              let conRef = myConnectionsRef.push(true)
              currentConnectionId = conRef.key
              conRef.onDisconnect().remove()
            }
            lastOnlineRef.onDisconnect().set(Firebase.database.ServerValue.TIMESTAMP)
          }
        })
      }
      else {
        const { status } = getState().auth
        if (!status) {
          dispatch({ type: 'AUTH_SETUP' })
        }
        else if (status !== 'anonymous') {
          dispatch({ type: 'LOGOUT' })
        }
      }
    })
  }
}

export function attemptLogin(providerName) {
  let provider
  switch(providerName) {
  case 'google': provider = new Firebase.auth.GoogleAuthProvider(); break
  case 'facebook': provider = new Firebase.auth.FacebookAuthProvider(); break
  default: return false
  }

  return (dispatch) => {
    dispatch({ type: 'ATTEMPTING_LOGIN' })

    firebase.auth().signInWithRedirect(provider)
      .catch(error => {
        dispatch({ type: 'LOGOUT' })
        console.error(error.message)
      })
  }
}

export function signOut() {
  return (dispatch, getState) => {
    const { uid } = getState().auth

    if (currentConnectionId) {
      const connectionRef = firebase.database().ref(`users/${uid}/connections/${currentConnectionId}`)
      const lastOnlineRef = firebase.database().ref(`users/${uid}/lastOnline`)
      connectionRef.remove()
      lastOnlineRef.set(Firebase.database.ServerValue.TIMESTAMP)
    }

    firebase.auth().signOut()
  }

}
