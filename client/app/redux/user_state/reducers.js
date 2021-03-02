import {
    LOCATION_STATE,
} from './types';

// userState is a redux state of the selected user state
const userState = {
    location: null,
    locationFlag: false,
    locationPermission: false,
}

// userReducer is a redux reducer of the selected user state
export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case LOCATION_STATE: return {
            ...state,
            location: action.location,
            locationFlag: action.locationFlag,
            locationPermission: action.locationPermission,
        }
        default: return state
    }
}