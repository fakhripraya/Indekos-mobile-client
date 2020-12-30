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
                        <View style={styles.backgroundContainer} >
                            <View style={styles.background_1} />
                            <View style={styles.background_2} />
                        </View>
                        <View style={styles.backgroundContainer_2} />
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
        borderRadius: 200 / 2,
        width: AppStyle.screenSize.width * 0.6,
        top: (AppStyle.screenSize.height * 0.2),
        height: AppStyle.screenSize.height * 0.3,
        right: (AppStyle.screenSize.width * 0.70),
        backgroundColor: AppStyle.fourt_main_color,
    },
    background_2: {
        position: 'absolute',
        borderRadius: 300 / 2,
        backgroundColor: AppStyle.main_color,
        width: AppStyle.screenSize.width * 0.9,
        left: (AppStyle.screenSize.width) * 0.6,
        height: AppStyle.screenSize.height * 0.3,
        bottom: (AppStyle.screenSize.height * 0.375),
        transform: [{ scaleX: 2 }, { scaleY: 3 }, { rotate: '5deg' }],
    },
})
