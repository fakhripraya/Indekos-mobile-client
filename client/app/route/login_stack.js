import React from 'react';
import Login from '../screens/LoginScreen/login';
import OTP from '../screens/OTPScreen/OTP';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the LoginStack
export default function LoginStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerTransparent: false, headerStyle: { height: 0 }, title: '', headerTintColor: 'rgba(255,255,255,0)' }}>
            <NestedStack.Screen name="Login" component={Login} />
            <NestedStack.Screen name="OTP" component={OTP} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
        </NestedStack.Navigator>
    );
}