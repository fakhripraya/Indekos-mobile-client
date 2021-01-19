import React from 'react';
import RoomSelection from '../screens/BookScreen/room_selection';
import MemberDetails from '../screens/BookScreen/member_details';
import { createStackNavigator } from '@react-navigation/stack';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the BookStack
export default function BookStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="RoomSelection" component={RoomSelection} options={{ headerShown: false }} />
            <NestedStack.Screen name="MemberDetails" component={MemberDetails} options={{ headerShown: false }} />
        </NestedStack.Navigator>
    );
}