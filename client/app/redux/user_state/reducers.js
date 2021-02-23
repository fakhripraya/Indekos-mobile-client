import {
    ROLE_ID_STATE,
    LOCATION_STATE,
    DISPLAY_NAME_STATE,
} from './types';

// userState is a redux state of the selected user state
const userState = {
    RoleId: null,
    displayName: '',
    location: null,
    locationFlag: false,
    locationPermission: false,
}

// userReducer is a redux reducer of the selected user state
export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case DISPLAY_NAME_STATE: return {
            ...state,
            displayName: action.displayName,
        }
        case ROLE_ID_STATE: return {
            ...state,
            RoleId: action.RoleId,
        }
        case LOCATION_STATE: return {
            ...state,
            location: action.location,
            locationFlag: action.locationFlag,
            locationPermission: action.locationPermission,
        }
        default: return state
    }
}