import { CURRENT_USER_STATE } from './types'

// currentUserChange is a redux action to store temporary user info
export const currentUserChange = ({ show, title, message }) => {
    return {
        type: CURRENT_USER_STATE,
        show: show,
        title: title,
        message: message,
    }
}
