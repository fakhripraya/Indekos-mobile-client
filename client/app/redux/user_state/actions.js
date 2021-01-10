import {
    CLEAR_STATE,
    ROLE_ID_STATE,
    DISPLAY_NAME_STATE,
} from './types';

// UserDisplayNameChange is a redux action to store temporary selected user display name
export const UserDisplayNameChange = ({ displayName }) => {
    return {
        type: DISPLAY_NAME_STATE,
        displayName: displayName,
    }
}

// UserRoleChange is a redux action to store temporary selected user role id
export const UserRoleChange = ({ roleId }) => {
    return {
        type: ROLE_ID_STATE,
        roleId: roleId,
    }
}

// ClearUserState is a redux action to clear the selected user state
export const ClearUserState = () => {
    return {
        type: CLEAR_STATE,
    }
}
