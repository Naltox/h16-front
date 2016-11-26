const API_VERSION = '5.53'

export default class VKApi {
    static MIN_WIDTH = 650
    static MIN_HEIGHT = 350

    constructor() {
        this._vk = window.VK
        this._paramsString = location.search.slice(1)
        this._parsedParams = this._paramsString.split('&')
            .reduce((a, b) => {
                b = b.split('=')
                a[b[0]] = decodeURIComponent(b[1]);
                return a
            }, {})


        this._onGroupSettingsChanged = () => {}
        this._vk.addCallback('onGroupSettingsChanged', (scope, token) => {
            this._onGroupSettingsChanged(scope, token)
        })

        this._onAllowMessagesFromCommunity = () => {}
        this._vk.addCallback('onAllowMessagesFromCommunity', () => {
            this._onAllowMessagesFromCommunity()
        })
    }

    set onGroupSettingsChanged(func) {
        this._onGroupSettingsChanged = func
    }

    set onAllowMessagesFromCommunity(func) {
        this._onAllowMessagesFromCommunity = func
    }
    /**
     * @return {Promise}
     */
    init() {
        return new Promise((resolve, reject) => {
            if (!this._vk) {
                console.error('VK api', 'window.vk is not defined')
                reject({ error: 'window.vk is not defined' })
                return
            }

            this._vk.init(() => {
                console.error('VK api', 'initialization failed')
                reject({ error: 'VK api initialization failed '})
            }, () => {
                resolve()
            }, API_VERSION)
        })
    }

    resize(w, h, callback) {
        let proxyCallback = (width, height) => {
            this._vk.removeCallback('onWindowResized', proxyCallback);
            callback(width, height);
        };
        this._vk.addCallback('onWindowResized', proxyCallback);
        this._vk.callMethod("resizeWindow", Math.max(w, VKApi.MIN_WIDTH), Math.max(h, VKApi.MIN_HEIGHT));
        if (w < VKApi.MIN_WIDTH || h < VKApi.MIN_HEIGHT) {
            callback(Math.max(w, VKApi.MIN_WIDTH), Math.max(h, VKApi.MIN_HEIGHT));
        }
    }

    showGroupSettingsBox(scope) {
        this._vk.callMethod("showGroupSettingsBox", scope)
    }

    showAllowMessagesFromCommunityBox() {
        VK.callMethod("showAllowMessagesFromCommunityBox")
    }

    /**
     * @return {string}
     */
    get paramsString() {
        return this._paramsString
    }

    /**
     * @return {object}
     */
    get parsedParams() {
        return this._parsedParams
    }

    /**
     * @return {number}
     */
    get groupId() {
        return Number(this.parsedParams.group_id)
    }

    /**
     * @return {string}
     */
    get authKey() {
        return this.parsedParams.auth_key
    }

    /**
     * @return {number}
     */
    get viewerId() {
        return Number(this.parsedParams.viewer_id)
    }

    /**
     * @returns {boolean}
     */
    isAdmin() {
        return this.parsedParams.viewer_type == 4
    }


    /**
     * @returns {boolean}
     */
    isMobile() {
        return location.pathname.indexOf('/mobile') != -1
    }
}