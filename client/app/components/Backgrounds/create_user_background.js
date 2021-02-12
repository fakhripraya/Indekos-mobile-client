import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { AppStyle, Normalize } from '../../config/app.config';

// FirstBackground is the first background image for the Create user stack
export function FirstBackground(props) {

    // Renders the First background
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                    <View style={firstStyles.container}>
                        <View style={firstStyles.background_1} />
                        <View style={firstStyles.background_2} />
                        {props.children}
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

export function SecondBackground(props) {

    // Renders the Second background
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                    <View style={secondStyles.container}>
                        <View style={secondStyles.backgroundContainer} >
                            <View style={secondStyles.background_1} />
                            <View style={secondStyles.background_2} />
                        </View>
                        <View style={secondStyles.backgroundContainer_2} />
                        {props.children}
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

// the first render elements style
const firstStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyle.main_color,
    },
    background_1: {
        position: 'absolute',
        alignSelf: 'flex-start',
        transform: [{ scale: 2 }],
        borderRadius: Normalize(300),
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        backgroundColor: AppStyle.third_main_color,
    },
    background_2: {
        position: 'absolute',
        alignSelf: 'flex-end',
        transform: [{ scale: 2 }],
        borderRadius: Normalize(300),
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        backgroundColor: 'rgba(78, 122, 174, 0.5)',
    },
})

// the second render elements style
const secondStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    backgroundContainer: {
        flex: 0.40,
        backgroundColor: AppStyle.third_main_color,
    },
    backgroundContainer_2: {
        flex: 0.60,
        backgroundColor: 'white',
    },
    background_1: {
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: Normalize(300),
        width: AppStyle.screenSize.width * 0.6,
        top: (AppStyle.screenSize.height * 0.2),
        height: AppStyle.screenSize.height * 0.3,
        right: (AppStyle.screenSize.width * 0.60),
        backgroundColor: AppStyle.fourt_main_color,
    },
    background_2: {
        position: 'absolute',
        borderRadius: Normalize(300),
        backgroundColor: AppStyle.main_color,
        width: AppStyle.screenSize.width * 0.5,
        left: (AppStyle.screenSize.width) * 0.7,
        height: AppStyle.screenSize.height * 0.5,
        bottom: (AppStyle.screenSize.height * 0.575),
        transform: [{ scaleX: 3 }, { scaleY: 3 }, { rotate: '5deg' }],
    },
})
