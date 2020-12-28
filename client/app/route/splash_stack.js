import React from 'react';
import Splash from '../screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a root stack navigator
const NestedStack = createStackNavigator();

export default function SplashStack() {
    return (
        <NestedStack.Navigator screenOptions={{ headerShown: false }}>
            <NestedStack.Screen name="Splash" component={Splash} />
        </NestedStack.Navigator>
    );
}