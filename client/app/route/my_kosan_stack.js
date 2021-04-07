import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import MyKosanDetail from '../screens/MyKosanScreen/my_kosan_detail';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the MyKosanStack
export default function MyKosanStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: false, headerStyle: { height: 0 }, title: '', headerTintColor: 'rgba(255,255,255,0)' }}>
            <NestedStack.Screen name="MyKosanDetail" component={MyKosanDetail} />
        </NestedStack.Navigator>
    );
}