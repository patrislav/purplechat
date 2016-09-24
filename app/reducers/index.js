import { combineReducers } from 'redux'
import auth from './auth'
import chats from './chats'
import messages from './messages'
import users from './users'
import settings from './settings'

const reducers = combineReducers({ auth, chats, messages, users, settings })

export default reducers
