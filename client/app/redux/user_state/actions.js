import {
    ROLE_ID_STATE,
    LOCATION_STATE,
    DISPLAY_NAME_STATE,
} from './types';

// userDisplayNameChange is a redux action to store temporary selected user display name
export const userDisplayNameChange = ({ displayName }) => {
    return {
        type: DISPLAY_NAME_STATE,
        displayName: displayName,
    }
}

// userRoleChange is a redux action to store temporary selected user role id
export const userRoleChange = ({ roleId }) => {
    return {
        type: ROLE_ID_STATE,
        roleId: roleId,
    }
}

// userLocationState is a redux action to change the selected user location state
export const userLocationState = ({ locationPermission, location, locationFlag }) => {
    return {
        type: LOCATION_STATE,
        location: location,
        locationFlag: locationFlag,
        locationPermission: locationPermission,
    }
}
