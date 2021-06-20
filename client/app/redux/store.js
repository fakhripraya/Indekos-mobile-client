import { createStore } from 'redux';
import storage from 'redux-persist/es/storage';
import { popUpModalReducer } from './pop_up_state/reducers';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { chatRoomsReducer, chatRoomMembersReducer, chatRoomChatsReducer } from './chat_state/reducers';

const encryptor = encryptTransform({
    secretKey: 'my-super-secret-key', //TODO: SAVE DI DATABASE KALO PRODUCTION
    onError: function (error) {
        console.log(`Error while trying to create state encryptor: ${error.message}`)
    },
})

const config = {
    key: "primary",
    storage
}

const rootReducer = {
    chatRoomsReducer,
    popUpModalReducer,
    chatRoomChatsReducer,
    chatRoomMembersReducer
}

let persistedReducer = persistCombineReducers(
    config,
    rootReducer,
    {
        transforms: [
            encryptor
        ],
    });

export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return {
        store,
        persistor
    }
}