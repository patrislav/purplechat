const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
  case 'MESSAGE_ADD': {
    const { key, chatId, message } = action
    const messageWithKey = Object.assign({}, message, { key })

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

    return { ...state, [chatId]: chat }
  }

  default:
    return state
  }
}
