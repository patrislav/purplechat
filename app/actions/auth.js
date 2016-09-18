import Firebase from 'firebase'
import firebase from 'core/firebase'

export function startAuthListener() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user
        dispatch({
          type: 'LOGIN',
          uid, displayName, photoURL
        })

        // If the user's doesn't exist in the /users/$uid/profile node, create it
        const profileRef = firebase.database().ref(`users/${uid}/profile`)
        profileRef.once('value', snapshot => {
          const val = snapshot.val()
          if (!val) {
            profileRef.set({ displayName, photoURL })
          }
        })

        // Handle online status
        const myConnectionsRef = firebase.database().ref(`users/${uid}/connections`)
        const lastOnlineRef = firebase.database().ref(`users/${uid}/lastOnline`)
        const connectedRef = firebase.database().ref('.info/connected')
        connectedRef.on('value', connected => {
          if (connected.val() === true) {
            const con = myConnectionsRef.push(true)
            con.onDisconnect().remove()
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
