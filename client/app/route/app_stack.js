import React from 'react';
import Home from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a nested stack navigator
const NestedStack = createStackNavigator();

// export the AppStack
export default function AppStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Home" component={Home} />
        </NestedStack.Navigator>
    );
}