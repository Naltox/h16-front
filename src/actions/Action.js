export default class Action {
    constructor(payload) {
        this._type = this.constructor.name
        this._payload = payload
    }

    get type() {
        return this._type
    }

    serialize() {
        return {
            type: this._type,
            payload: this._payload
        }
    }

    static deserialize() {}
}