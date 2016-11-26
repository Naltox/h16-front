import { combineReducers } from 'redux'
import RootReducer from './RootReducer'
import ChatScreenReducer from './ChatScreenReducer'

const rootReducer = combineReducers({
    root: RootReducer.getReducer(),
    chat: ChatScreenReducer.getReducer()
})

export default rootReducer