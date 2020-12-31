import { combineReducers, createStore } from 'redux'
import { popUpModalReducer } from './pop_up_state/reducers'
import { accountRegistrationReducer } from './account_registration_state/reducers'

// rootReducer combines all the available reducers into one
const rootReducer = combineReducers({
    accountRegistrationReducer,
    popUpModalReducer
})

// store is a redux store that holds all the client temporary data
const store = createStore(rootReducer);

export default store;