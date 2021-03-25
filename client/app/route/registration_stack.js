import React from 'react';
import OTP from '../screens/OTPScreen/OTP';
import { enableScreens } from 'react-native-screens';
import Register from '../screens/RegisterScreen/register';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterFinal from '../screens/RegisterScreen/register_final';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the RegistrationStack
export default function RegistrationStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <NestedStack.Screen name="OTP" component={OTP} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
            <NestedStack.Screen name="RegisterFinal" component={RegisterFinal} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
        </NestedStack.Navigator>
    );
}