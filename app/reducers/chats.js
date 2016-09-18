const initialState = []

export default function(state = initialState, action) {
  switch(action.type) {
  case 'CHAT_ADD': {
    const { key, userId, lastMessage } = action

    // Don't add a new item if it already exists in the state
    if (state.find(chat => chat.key === key)) {
      return state
    }

    const newItem = { key, userId, lastMessage }
    return [...state, newItem]
  }

  case 'CHAT_UPDATE': {
    const { key, userId } = action
    state = state.slice(0)

    const index = state.findIndex(chat => chat.key === key)
    if (index > -1) {
      state[index] = Object.assign({}, state[index], { userId })
    }

    return state
  }

  default:
    return state
  }
}
