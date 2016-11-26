import { Reducer, reduce } from './Reducer'
import AddMessage from '../actions/AddMessage'

class RootReducer extends Reducer {
    @reduce(AddMessage, { messages: [] })
    /**
     * @param state
     * @param {AddMessage} action
     */
    handleAddMessage(state, action) {
        let messages = state.messages ? state.messages.concat([action.message]) : [action.message]

        if (messages.length > 100) {
            messages = messages.slice(1)
        }

        return { messages }
    }
}

export default new RootReducer()