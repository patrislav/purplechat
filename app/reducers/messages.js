const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
  case 'MESSAGES_LOAD': {
    const { chatId, messages } = action

    let chat = []
    if (state[chatId]) {
      chat = state[chatId]
      messages.forEach(message => {
        if (!state[chatId].find(stateMessage => message.key === stateMessage.key)) {
          chat.push(message)
        }
      })
    }
    else {
      chat.push(...messages)
    }

    return { ...state, [chatId]: chat }
  }

  case 'MESSAGE_UPDATE': {
    const { chatId, message } = action
    let chat = state[chatId].slice(0)

    const index = chat.findIndex(chatMessage => chatMessage.key === message.key)
    if (index > -1) {
      chat[index] = Object.assign({}, chat[index], message)
    }

    return { ...state, [chatId]: chat }
  }

  default:
    return state
  }
}
