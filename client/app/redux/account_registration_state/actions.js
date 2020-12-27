import { NEW_ACCOUNT_INPUT } from './types'

export const accountRegistrationChange = (newAcc) => {
    return {
        type: NEW_ACCOUNT_INPUT,
        username: newAcc.username,
        password: newAcc.password,
        otp_code: newAcc.otp_code
    }
}
