import React from 'react';
import Home from '../screens/HomeScreen';
import Splash from '../screens/SplashScreen';
import Welcome from '../screens/WelcomeScreen';
import Register from '../screens/RegisterScreen';
import { Transition } from 'react-native-reanimated';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

const AppStack = createStackNavigator(
    {
        Home: Home
    }
);
const AuthStack = createStackNavigator(
    {
        Register: Register
    }
);

export default createAppContainer(createAnimatedSwitchNavigator(
    {
        Splash: Splash,
        Welcome: Welcome,
        Auth: AuthStack,
        App: AppStack
    },
    {
        initialRouteName: 'Splash',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="fade"
                    durationMs={500}
                    interpolation="easeIn"
                />
                <Transition.In
                    type="fade"
                    durationMs={500} />
            </Transition.Together>
        ),
    }
));