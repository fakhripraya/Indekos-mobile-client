import React from 'react';
import KostDetail from '../screens/BookScreen/kost_detail';
import { createStackNavigator } from '@react-navigation/stack';
import MemberDetails from '../screens/BookScreen/member_details';
import RoomSelection from '../screens/BookScreen/room_selection';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the BookStack
export default function BookStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: false, headerStyle: { height: 0 }, title: '', headerTintColor: 'white' }}>
            <NestedStack.Screen name="KostDetail" component={KostDetail} />
            <NestedStack.Screen name="RoomSelection" component={RoomSelection} />
            <NestedStack.Screen name="MemberDetails" component={MemberDetails} />
        </NestedStack.Navigator>
    );
}