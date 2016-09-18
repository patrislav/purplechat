const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'USER_UPDATE': {
    const { userId, user } = action
    const data = Object.assign({}, state[userId] || {}, user)
    return { ...state, [userId]: data }
  }

  case 'USER_PRESENCE_UPDATE': {
    const { userId, presence } = action
    const data = Object.assign({}, state[userId] || {}, { presence })
    return { ...state, [userId]: data }
  }

  default:
    return state
  }
}
