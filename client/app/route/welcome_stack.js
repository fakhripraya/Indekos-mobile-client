import React from 'react';
import Welcome from '../screens/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the WelcomeStack
export default function WelcomeStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerShown: false, headerBackAccessibilityLabel: false }}>
            <NestedStack.Screen name="Welcome" component={Welcome} />
        </NestedStack.Navigator>
    );
}