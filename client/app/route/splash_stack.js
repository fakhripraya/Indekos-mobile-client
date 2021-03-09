import React from 'react';
import Splash from '../screens/SplashScreen';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the SplashStack
export default function SplashStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerShown: false }}>
            <NestedStack.Screen name="Splash" component={Splash} />
        </NestedStack.Navigator>
    );
}