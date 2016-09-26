const initialState = {}

function chatUpdate(state, key, name, value) {
  let chat
  if (!(key in state)) {
    state[key] = { key }
  }

  chat = state[key]

  return {...state, [key]: { ...chat, [name]: value }}
}

export default function(state = initialState, action) {
  switch(action.type) {

  case 'CHAT_UPDATE': {
    const { chat } = action
    return {
      ...state,
      [chat.chatId]: Object.assign({}, state[chat.chatId] || {}, chat)
    }
  }

  case 'CHAT_UPDATE_PRESENCE':
    return chatUpdate(state, action.chatId, 'presence', action.presence)

  case 'CHAT_UPDATE_LASTMESSAGE':
    return chatUpdate(state, action.chatId, 'lastMessage', action.lastMessage)

  case 'CHAT_UPDATE_TYPING':
    return chatUpdate(state, action.chatId, 'typing', action.typing)

  default:
    return state
  }
}
