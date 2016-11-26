import React from "react";
import {render, unmountComponentAtNode} from 'react-dom'
import {Provider} from 'react-redux'
//import ConsoleLogger from './logging/ConsoleLogger'
import RootContainer from './containers/rootContainer/RootContainer'
import VKApi from './api/vk/VKApi'
import AppReducers from './reducers/AppReducers'
//import HHApi from './api/hhBackend/HHApi'
//import OpenScreenAction from './actions/OpenScreenAction'
import AllSpawners from './action-spawners/AllSpawners'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import WebSocketMessagesProvider from './core/WebSocketMessagesProvider'
import OpenChatScreen from './actions/routing/OpenChatScreen'
import AddMessage from './actions/AddMessage'

const messagesProvider = new WebSocketMessagesProvider()
const vkApi = new VKApi()

const store = createStore(AppReducers, applyMiddleware(thunk))

store.dispatch(new OpenChatScreen().serialize())

messagesProvider.getNewMessages(message => {
   // console.log('got new message')

    store.dispatch(new AddMessage(message).serialize())
})

// if (!vkApi.groupId) {
//     store.dispatch(new OpenScreenAction('notInstalled').serialize())
// }
// else {
//     if (vkApi.isAdmin() == true && vkApi.isMobile() == false) {
//         hhApi.getConnectedCRMInfo(vkApi.groupId)
//             .then(r => {
//                 if (r === false)
//                     store.dispatch(new OpenScreenAction('noIntegrationsScreen').serialize())
//                 else {
//                     store.dispatch(new OpenScreenAction('adminScreen').serialize())
//                 }
//             })
//             .catch(err => {
//                 store.dispatch(new OpenErrorScreenAction(err).serialize())
//             })
//     }
//     else {
//         hhApi.haveConnectedCRM(vkApi.groupId)
//             .then(isConnected => {
//                 if (isConnected == true) {
//                     store.dispatch(new OpenScreenAction('orderChecking').serialize())
//                 }
//                 else
//                     store.dispatch(new OpenScreenAction('appNotСonfigured').serialize())
//             })
//     }
// }

render(
    <Provider store={store}>
        <RootContainer isMobile={vkApi.isMobile()} />
    </Provider>,
    root
)

//
// try {
//     if (!vkApi.isMobile()) {
//         vkApi.resize(800, 500)
//     }
// }
// catch (e) {}


AllSpawners.forEach(spawner => {
    spawner.vkApi = vkApi
    spawner.messagesProvider = messagesProvider
})

