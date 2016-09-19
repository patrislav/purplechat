const initialState = []

function chatUpdate(state, key, name, value) {
  state = state.slice(0)

  const index = state.findIndex(chat => chat.key === key)
  if (index > -1) {
    state[index] = Object.assign({}, state[index], { [name]: value })
    return state
  }

  return [...state, { key, [name]: value }]
}

export default function(state = initialState, action) {
  switch(action.type) {

  case 'CHAT_UPDATE_USERID':
    return chatUpdate(state, action.key, 'userId', action.userId)

  case 'CHAT_UPDATE_LASTMESSAGE':
    return chatUpdate(state, action.key, 'lastMessage', action.lastMessage)

  case 'CHAT_UPDATE_TYPING':
    return chatUpdate(state, action.key, 'typing', action.typing)

  default:
    return state
  }
}
