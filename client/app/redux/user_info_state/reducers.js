import { CURRENT_USER_STATE } from './types'

// currentUserState is a redux state of the current logged in user
const currentUserState = {
    show: false,
    title: '',
    message: '',
}

// currentUserReducer is a redux reducer of the current logged in user
export const currentUserReducer = (state = currentUserState, action) => {
    switch (action.type) {
        case CURRENT_USER_STATE: return {
            ...state,
            show: action.show,
            title: action.title,
            message: action.message,
        }
        default: return state
    }
}