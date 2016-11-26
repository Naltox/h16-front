import { Reducer, reduce } from './Reducer'
import OpenChatScreen from '../actions/routing/OpenChatScreen'

class RootReducer extends Reducer {
    @reduce(OpenChatScreen, {})
    /**
     * @param state
     * @param {OpenChatScreen} action
     */
    handleOpenChatScreen(state, action) {
        return { currentScreen: OpenChatScreen.getName() }
    }
}

export default new RootReducer()