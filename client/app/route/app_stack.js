import React from 'react';
import Home from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

// create a root stack navigator
const NestedStack = createStackNavigator();

export default function AppStack() {
    return (
        <NestedStack.Navigator>
            <NestedStack.Screen name="Home" component={Home} />
        </NestedStack.Navigator>
    );
}