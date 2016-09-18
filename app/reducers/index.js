import { combineReducers } from 'redux'
import auth from './auth'
import chats from './chats'
import messages from './messages'
import users from './users'

const reducers = combineReducers({ auth, chats, messages, users })

export default reducers
