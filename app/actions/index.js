import * as auth from './auth'
import * as chats from './chats'
import * as messages from './messages'
import * as notifications from './notifications'

export default Object.assign({}, auth, chats, messages, notifications)
