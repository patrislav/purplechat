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
