import React from 'react';
import { enableScreens } from 'react-native-screens';
import CameraUtility from '../screens/CameraScreen/camera';
import KostDetail from '../screens/BookScreen/kost_detail';
import { createStackNavigator } from '@react-navigation/stack';
import MemberDetails from '../screens/BookScreen/member_details';
import RoomSelection from '../screens/BookScreen/room_selection';
import KTPVerification from '../screens/VerificationScreen/ktp_verification';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the BookStack
export default function BookStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: false, headerStyle: { height: 0 }, title: '', headerTintColor: 'rgba(255,255,255,0)' }}>
            <NestedStack.Screen name="KostDetail" component={KostDetail} />
            <NestedStack.Screen name="RoomSelection" component={RoomSelection} />
            <NestedStack.Screen name="MemberDetails" component={MemberDetails} />
            <NestedStack.Screen name="KTPVerification" component={KTPVerification} />
            <NestedStack.Screen name="CameraUtility" component={CameraUtility} />
        </NestedStack.Navigator>
    );
}