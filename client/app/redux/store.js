import { combineReducers, createStore } from 'redux'
import accountRegistrationReducer from './account_registration_state/reducers'

const rootReducer = combineReducers({
    accountRegistrationReducer
})

const store = createStore(rootReducer);

export default store;