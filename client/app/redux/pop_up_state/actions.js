import { MODAL_STATE } from './types'

// popUpModalChange is a redux action to store temporary generic message modal state
export const popUpModalChange = ({ show, title, message }) => {
    return {
        type: MODAL_STATE,
        show: show,
        title: title,
        message: message,
    }
}
