import Action from './Action'

export default class AddMessage extends Action {
    /**
     * @param {Message} message
     */
    constructor(message) {
        super({ message })
    }

    /**
     * @returns {Message}
     */
    get message() {
        return this._payload.message
    }

    static deserialize(raw) {
        return new AddMessage(raw.payload.message)
    }
}