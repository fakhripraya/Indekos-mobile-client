import { MODAL_STATE } from './types'

// popUpModalState is a redux state of the generic message modal window
const popUpModalState = {
    show: false,
    title: '',
    message: '',
}

// popUpModalReducer is a redux reducer of the generic message modal window
export const popUpModalReducer = (state = popUpModalState, action) => {
    switch (action.type) {
        case MODAL_STATE: return {
            ...state,
            show: action.show,
            title: action.title,
            message: action.message,
        }
        default: return state
    }
}