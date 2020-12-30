import { NEW_ACCOUNT_INPUT } from './types'

// accountRegistrationChange is a redux action to store temporary new users credentials 
export const accountRegistrationChange = ({ username, otp_code }) => {
    return {
        type: NEW_ACCOUNT_INPUT,
        username: username,
        otp_code: otp_code,
    }
}
