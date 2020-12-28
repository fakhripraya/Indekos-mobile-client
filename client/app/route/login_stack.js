import React from 'react';
import Login from '../screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the LoginStack
export default function LoginStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerShown: false, headerBackAccessibilityLabel: false }}>
            <NestedStack.Screen name="Login" component={Login} />
        </NestedStack.Navigator>
    );
}