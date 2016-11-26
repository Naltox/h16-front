export function reduce(action, defaultState) {
    return function (target, key, descriptor) {
        const prototype = Reflect.getPrototypeOf(target)
        const constructor = target.constructor

        if (constructor.reducers)
            constructor.reducers[action.prototype.constructor.name] = key
        else {
            constructor.reducers = { }
            constructor.reducers[action.prototype.constructor.name] = key
        }

        if (constructor.actions)
            constructor.actions[action.prototype.constructor.name] = action.prototype.constructor
        else {
            constructor.actions = { }
            constructor.actions[action.prototype.constructor.name] = action.prototype.constructor
        }

        if (defaultState) {
            if (constructor.defaultState)
                constructor.defaultState[action.prototype.constructor.name] = defaultState
            else {
                constructor.defaultState = { }
                constructor.defaultState[action.prototype.constructor.name] = defaultState
            }
        }

        return descriptor
    }
}

export class Reducer {
    handle(state, action) {
        if (this.constructor.reducers[action.type]) {
            const deserializedAction = this.constructor.actions[action.type].deserialize(action)
            return this[this.constructor.reducers[action.type]](state, deserializedAction)
        }
        else {
            return state
        }
    }

    getReducer() {
        return (state, action) => {
            state = state || this.defaultState || this.constructor.defaultState[action.type]

            return this.handle(state, action)
        }
    }

    get defaultState() {
        return {}
    }
}