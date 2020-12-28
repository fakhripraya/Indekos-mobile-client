import React from 'react';
import Welcome from '../screens/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a root stack navigator
const NestedStack = createStackNavigator();

export default function WelcomeStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerShown: false }}>
            <NestedStack.Screen name="Welcome" component={Welcome} />
        </NestedStack.Navigator>
    );
}