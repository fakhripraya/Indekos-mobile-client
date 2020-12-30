import { NEW_ACCOUNT_INPUT } from './types'

// accountRegistrationState is a redux state of a new users credentials
const accountRegistrationState = {
    username: '',
    otp_code: '',
}

// accountRegistrationReducer is a redux reducer of a new users credentials
const accountRegistrationReducer = (state = accountRegistrationState, action) => {
    switch (action.type) {
        case NEW_ACCOUNT_INPUT: return {
            ...state,
            username: action.username,
            otp_code: action.otp_code
        }
        default: return state
    }
}

export default accountRegistrationReducer;