import React from 'react';
import Register from '../screens/RegisterScreen/start';
import RegisterOtp from '../screens/RegisterScreen/otp';
import RegisterFinal from '../screens/RegisterScreen/final';
import { createStackNavigator } from '@react-navigation/stack';

// create a root stack navigator
const NestedStack = createStackNavigator();

export default function RegistrationStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <NestedStack.Screen name="RegisterOtp" component={RegisterOtp} options={{ headerTransparent: true, title: '' }} />
            <NestedStack.Screen name="RegisterFinal" component={RegisterFinal} options={{ headerTransparent: true, title: '' }} />
        </NestedStack.Navigator>
    );
}