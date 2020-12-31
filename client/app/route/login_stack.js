import React from 'react';
import Login from '../screens/LoginScreen/login';
import { createStackNavigator } from '@react-navigation/stack';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the LoginStack
export default function LoginStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: true, title: '', headerTintColor: 'white' }}>
            <NestedStack.Screen name="Login" component={Login} />
        </NestedStack.Navigator>
    );
}