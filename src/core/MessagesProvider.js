export default class MessagesProvider {
    /**
     * @callback newMessageCallback
     * @param {Message} message
     */

    /**
     * @param {newMessageCallback} callback
     */
    getNewMessages(callback) {
        throw 'Not implemented'
    }

    /**
     * @param {string} text
     */
    sendMessage(text) {
        throw 'Not implemented'
    }
}