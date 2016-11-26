export function spawner(target, key, descriptor) {
    const constructor = target.constructor

    if (constructor.spawnersList)
        constructor.spawnersList.push(key)
    else
        constructor.spawnersList = [key]

    return descriptor
}


export class ActionSpawner {
    getSpawners() {
        let spawners = {}

        this.constructor.spawnersList.forEach(i => {
            spawners[i] = (...args) => {
                let resp = this[i](...args)

                if (typeof resp == 'function') {
                    return (dispatch, getState) => {
                        resp(action => {
                            dispatch(action.serialize())
                        }, getState)
                    }
                }
                else {
                    return resp.serialize()
                }
            }
        })


        return spawners
    }

    /**
     * @return {VKApi}
     */
    get vkApi() {
        return this._vkApi
    }

    /**
     * @param {VKApi} vkApi
     */
    set vkApi(vkApi) {
        this._vkApi = vkApi
    }

    /**
     * @return {MessagesProvider}
     */
    get messagesProvider() {
        return this._messagesProvider
    }

    /**
     * @param {MessagesProvider} messagesProvider
     */
    set messagesProvider(messagesProvider) {
        this._messagesProvider = messagesProvider
    }
}