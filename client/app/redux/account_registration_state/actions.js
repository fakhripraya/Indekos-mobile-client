import { NEW_ACCOUNT_INPUT } from './types'

export const accountRegistrationChange = ({ username, password, otp_code }) => {
    return {
        type: NEW_ACCOUNT_INPUT,
        username: username,
        password: password,
        otp_code: otp_code,
    }
}
