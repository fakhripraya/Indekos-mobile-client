import React from 'react';
import Register from '../screens/RegisterScreen/register';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterOtp from '../screens/RegisterScreen/register_otp';
import RegisterFinal from '../screens/RegisterScreen/register_final';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the RegistrationStack
export default function RegistrationStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <NestedStack.Screen name="RegisterOtp" component={RegisterOtp} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
            <NestedStack.Screen name="RegisterFinal" component={RegisterFinal} options={{ headerTransparent: true, title: '', headerTintColor: 'white' }} />
        </NestedStack.Navigator>
    );
}