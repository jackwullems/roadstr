import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { createStore } from 'redux'

import RootReducer from './reducers'

const persistConfig = {
    key: 'roadstr',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)
export default createStore(persistedReducer)
