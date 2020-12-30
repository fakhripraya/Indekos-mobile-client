import React from 'react';
import { AppStyle } from '../../config/app.config';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';

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
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        transform: [{ scale: 2 }],
        position: 'absolute',
        alignSelf: 'flex-start',
        backgroundColor: AppStyle.third_main_color,
        borderRadius: 100,
    },
    background_2: {
        top: AppStyle.screenSize.height * 0.85,
        width: AppStyle.screenSize.width * 0.5,
        height: AppStyle.screenSize.width * 0.5,
        transform: [{ scale: 2 }],
        position: 'absolute',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(78, 122, 174, 0.5)',
        borderRadius: 100,
    },
})
