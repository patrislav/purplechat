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

  case 'MESSAGE_ADD': {
    const { key, chatId, message } = action
    const messageWithKey = Object.assign({}, message, { key })

    // console.log('Message added ' + message.text)

    let chat = []
    if (state[chatId]) {
      chat = state[chatId]
      if (!state[chatId].find(message => message.key === key)) {
        chat.push(messageWithKey)
      }
    }
    else {
      chat.push(messageWithKey)
    }

    const newState = { ...state, [chatId]: chat }
    console.log(newState)

    return newState
  }

  default:
    return state
  }
}
