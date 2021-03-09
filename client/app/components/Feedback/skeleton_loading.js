import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get("window");
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonLoading = () => {

    const animatedValue = new Animated.Value(0);

    useEffect(() => {

        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.linear)
            })
        ).start();

    })

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    })

    return (
        <AnimatedLG colors={["#a0a0a0", "#b0b0b0", "#a0a0a0", "#b0b0b0"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ ...StyleSheet.absoluteFill, transform: [{ translateX: translateX }] }} />
    )
}

export default SkeletonLoading
