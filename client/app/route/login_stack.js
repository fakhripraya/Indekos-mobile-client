import React from 'react';
import Login from '../screens/LoginScreen/login';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the LoginStack
export default function LoginStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Login" component={Login} />
        </NestedStack.Navigator>
    );
}