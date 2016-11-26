import { ActionSpawner, spawner } from './ActionSpawner'

class ChatScreenActionsSpawner extends ActionSpawner {
    @spawner
    sendMessage(text) {
        return d => {
            this.messagesProvider.sendMessage(text)
        }
    }
}

export default new ChatScreenActionsSpawner()