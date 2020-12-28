import React from 'react';
import { Easing } from 'react-native';
import Home from '../screens/HomeScreen';
import Splash from '../screens/SplashScreen';
import Welcome from '../screens/WelcomeScreen';
import { Transition } from 'react-native-reanimated';
import { createAppContainer } from 'react-navigation';
import Register from '../screens/RegisterScreen/start';
import RegisterOtp from '../screens/RegisterScreen/otp';
import RegisterFinal from '../screens/RegisterScreen/final';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

const openConfig = {
    animation: 'timing',
    config: {
        stiffness: 1000,
        damping: 50,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear
    },
};

// AppStack is the application main stack that roots on the home page
const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                headerTransparent: true
            }
        }
    }
);

// RegistrationStack is the application registration stack that roots on the register page
const RegistrationStack = createStackNavigator(
    {
        Register: {
            screen: Register,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true,
            },
        },
        RegisterOtp: {
            screen: RegisterOtp,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true,
            }
        },
        RegisterFinal: {
            screen: RegisterFinal,
            navigationOptions: {
                headerTitle: '',
                headerTransparent: true,
            },
        }
    },
    {
        initialRouteName: 'Register'
    }
);

export default createAppContainer(createAnimatedSwitchNavigator(
    {
        Splash: Splash, // Shows application splash screen as the root
        Welcome: Welcome, // Shows application welcome screen 
        Registration: RegistrationStack, // Shows application registration stack
        App: AppStack // Shows application main stack
    },
    {
        initialRouteName: 'Splash',
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="fade"
                    durationMs={300}
                    interpolation="easeInOut"
                />
                <Transition.In
                    type="fade"
                    durationMs={300}
                    interpolation="easeInOut" />
            </Transition.Together>
        ),
    }
));