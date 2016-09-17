import { combineReducers } from 'redux'
import auth from './auth'
import chats from './chats'
import messages from './messages'

const reducers = combineReducers({ auth, chats, messages })

export default reducers
