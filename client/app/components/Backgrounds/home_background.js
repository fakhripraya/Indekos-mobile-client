import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React from 'react';
import { AppStyle } from '../../config/app.config';

// HomeBackground is the background image for the home stack
export default function HomeBackground(props) {

    // Renders the HomeStack background
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer} >
                        <View style={styles.background_2} />
                        <View style={styles.background_1} />
                        <View style={styles.background_3} />
                    </View>
                    {props.children}
                </ScrollView>
            </View>
        </View>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    backgroundContainer: {
        position: 'absolute',
        height: AppStyle.screenSize.height * 0.3,
        width: AppStyle.screenSize.width,
        backgroundColor: AppStyle.main_color,
    },
    background_3: {
        position: 'absolute',
        alignSelf: 'center',
        width: AppStyle.screenSize.width,
        top: (AppStyle.screenSize.height * 0.4),
        height: AppStyle.screenSize.height * 0.3,
        backgroundColor: 'white',
    },
    background_1: {
        position: 'absolute',
        borderRadius: 300 / 2,
        backgroundColor: AppStyle.fourt_main_color,
        width: AppStyle.screenSize.height * 0.25,
        height: AppStyle.screenSize.height * 0.25,
        left: -AppStyle.screenSize.height * 0.15,
        top: -AppStyle.screenSize.height * 0.15,
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
    },
    background_2: {
        position: 'absolute',
        borderRadius: 300 / 2,
        backgroundColor: AppStyle.third_main_color,
        width: AppStyle.screenSize.height * 0.3,
        height: AppStyle.screenSize.height * 0.3,
        left: -AppStyle.screenSize.height * 0.15,
        top: -AppStyle.screenSize.height * 0.15,
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
    },
})
