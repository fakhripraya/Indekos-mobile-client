import {
    LOCATION_STATE,
} from './types';

// userLocationState is a redux action to change the selected user location state
export const userLocationState = ({ locationPermission, location, locationFlag }) => {
    return {
        type: LOCATION_STATE,
        location: location,
        locationFlag: locationFlag,
        locationPermission: locationPermission,
    }
}
