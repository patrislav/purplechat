const initialState = {
  status: null,
  uid: null,
  displayName: null,
  photoURL: null,
  pushSubscription: null
}

export default function(state = initialState, action) {
  switch(action.type) {
  case 'ATTEMPTING_LOGIN':
    return { ...state, status: 'awaiting_auth' }

  case 'LOGOUT':
  case 'AUTH_SETUP':
    return { ...state, status: 'anonymous' }

  case 'LOGIN': {
    const { uid, displayName, photoURL } = action
    state = { ...state, status: 'signed_in', uid, displayName, photoURL }
    return state
  }

  case 'PUSH_SUBSCRIPTION_CHANGED': {
    const { pushSubscription } = action
    return { ...state, pushSubscription }
  }

  default:
    return state
  }
}
