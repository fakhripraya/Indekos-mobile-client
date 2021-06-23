import React from 'react';
import Splash from '../screens/SplashScreen';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Optimize navigation
enableScreens();

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the SplashStack
export default function SplashStack() {
    return (
        <NestedStack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                headerShown: false
            }}>
            <NestedStack.Screen name="Splash" component={Splash} />
        </NestedStack.Navigator>
    );
}