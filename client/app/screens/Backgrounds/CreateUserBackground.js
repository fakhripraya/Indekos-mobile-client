import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import React from 'react';
import { AppStyle } from '../../config/app.config';

// RegistrationBackground is the background image for the registration stack
export default function RegistrationBackground(props) {

    // Renders the RegistrationStack background
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                    <View style={styles.container}>
                        <View style={styles.background_1} />
                        <View style={styles.background_2} />
                        {props.children}
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyle.main_color,
    },
    background_1: {
        borderRadius: 100,
        position: 'absolute',
        alignSelf: 'flex-start',
        transform: [{ scale: 2 }],
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        backgroundColor: AppStyle.third_main_color,
    },
    background_2: {
        borderRadius: 100,
        position: 'absolute',
        alignSelf: 'flex-end',
        transform: [{ scale: 2 }],
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        backgroundColor: 'rgba(78, 122, 174, 0.5)',
    },
})
