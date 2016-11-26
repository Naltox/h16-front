export default class Message {
    /**
     * @param {number} userId
     * @param {string} userName
     * @param {string} text
     * @param {string} sticker
     * @param {string} userPic
     */
    constructor(
        userId,
        userName,
        text,
        sticker,
        userPic
    ) {
        this._userId = userId
        this._userName = userName
        this._text = text
        this._sticker = sticker
        this._userPic = userPic
    }

    /**
     * @returns {number}
     */
    get userId() {
        return this._userId
    }

    /**
     * @returns {string}
     */
    get userName() {
        return this._userName
    }

    /**
     * @returns {string}
     */
    get text() {
        return this._text
    }

    /**
     * @returns {string}
     */
    get sticker() {
        return this._sticker
    }

    /**
     * @returns {string}
     */
    get userPic() {
        return this._userPic
    }

    /**
     * @param {object} raw
     * @returns {Message}
     */
    static deserialize(raw) {
        return new Message(
            raw.userId,
            raw.userName,
            raw.text,
            raw.sticker,
            raw.userPic
        )
    }

    /**
     * @returns {object}
     */
    serialize() {
        return {
            userId: this._userId,
            userName: this._userName,
            text: this._text,
            sticker: this._sticker,
            userPic: this.userPic
        }
    }
}
