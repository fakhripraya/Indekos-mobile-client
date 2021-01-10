import {
    CLEAR_STATE,
    ROLE_ID_STATE,
    DISPLAY_NAME_STATE,
} from './types';

// UserState is a redux state of the selected user state
const UserState = {
    RoleId: null,
    displayName: '',
}

// UserReducer is a redux reducer of the selected user state
export const UserReducer = (state = UserState, action) => {
    switch (action.type) {
        case DISPLAY_NAME_STATE: return {
            ...state,
            displayName: action.displayName,
        }
        case ROLE_ID_STATE: return {
            ...state,
            RoleId: action.RoleId,
        }
        case CLEAR_STATE: return {
            ...state,
            RoleId: null,
            displayName: '',
        }
        default: return state
    }
}