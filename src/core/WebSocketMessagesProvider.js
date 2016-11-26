import MessagesProvider from './MessagesProvider'
import Message from './Message'

export default class WebSocketMessagesProvider extends MessagesProvider {
    constructor() {
        super()
        this._newMessagesCallback = new Function()

        this._socket = new WebSocket("wss://0.0.0.0/serv")

        this._socket.onmessage = event => {
            const incomingMessage = JSON.parse(event.data)

            console.log(event.data)
            if (incomingMessage.message) {
                const message = Message.deserialize(incomingMessage.message)

                this._newMessagesCallback(message)
            }
        }
    }

    /**
     * @callback newMessageCallback
     * @param {Message} message
     */

    /**
     * @param {newMessageCallback} callback
     */
    getNewMessages(callback) {
        this._newMessagesCallback = callback
    }


    /**
     * @param {string} text
     */
    sendMessage(text) {
        this._socket.send(JSON.stringify({
            sendMessage: {
                text
            }
        }))
    }
}