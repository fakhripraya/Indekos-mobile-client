import { NEW_ACCOUNT_INPUT } from './types'

// accountRegistrationChange is a redux action to store temporary new users credentials 
export const accountRegistrationChange = ({ username }) => {
    return {
        type: NEW_ACCOUNT_INPUT,
        username: username,
    }
}
