import { NEW_ACCOUNT_INPUT } from './types'

// accountRegistrationState is a redux state of a new users credentials
const accountRegistrationState = {
    username: '',
}

// accountRegistrationReducer is a redux reducer of a new users credentials
export const accountRegistrationReducer = (state = accountRegistrationState, action) => {
    switch (action.type) {
        case NEW_ACCOUNT_INPUT: return {
            ...state,
            username: action.username
        }
        default: return state
    }
}