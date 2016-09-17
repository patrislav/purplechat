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

        // If the user doesn't exist in the /users node, create it
        const userRef = firebase.database().ref(`users/${uid}`)
        userRef.once('value', snapshot => {
          const val = snapshot.val()
          if (!val) {
            userRef.set({
              profile: { displayName, photoURL }
            })
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
