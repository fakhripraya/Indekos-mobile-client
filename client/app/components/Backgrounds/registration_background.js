import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { AppStyle, Normalize } from '../../config/app.config';

// RegistrationBackground is the background image for the registration stack
export default function RegistrationBackground(props) {
    return (
        <View style={{ flex: 1, width: AppStyle.windowSize.width, height: AppStyle.windowSize.height }}>
            <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                <View style={styles.container}>
                    <View style={styles.backgroundContainer} >
                        <View style={styles.background_1} />
                        <View style={styles.background_2} />
                    </View>
                    <View style={styles.backgroundContainer_2} />
                    {props.children}
                </View>
            </View>
        </View >
    )
}

// the render elements style
const styles = StyleSheet.create({
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
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: Normalize(300),
        width: AppStyle.screenSize.width * 0.6,
        top: (AppStyle.screenSize.height * 0.2),
        height: AppStyle.screenSize.height * 0.6,
        right: (AppStyle.screenSize.width * 0.7),
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
