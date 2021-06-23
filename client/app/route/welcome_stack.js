import React from 'react';
import Welcome from '../screens/WelcomeScreen';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the WelcomeStack
export default function WelcomeStack() {
    return (
        <NestedStack.Navigator screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false
        }}>
            <NestedStack.Screen name="Welcome" component={Welcome} />
        </NestedStack.Navigator>
    );
}