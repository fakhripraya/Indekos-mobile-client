import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React from 'react';
import { AppStyle } from '../../config/app.config';
import { Normalize } from '../../functions/normalize';

// HomeBackground is the background image for the home stack
export default function HomeBackground(props) {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ width: '100%', height: AppStyle.windowSize.height }}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ height: '100%' }}>
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
        width: AppStyle.windowSize.width,
        backgroundColor: AppStyle.third_main_color,
        height: AppStyle.windowSize.height * 0.425,
    },
    background_3: {
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.3,
        top: (AppStyle.windowSize.height * 0.425),
    },
    background_1: {
        position: 'absolute',
        borderRadius: Normalize(300),
        bottom: -AppStyle.windowSize.height * 0.2,
        width: AppStyle.windowSize.height * 0.425,
        left: -AppStyle.windowSize.height * 0.15,
        height: AppStyle.windowSize.height * 0.425,
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
        backgroundColor: AppStyle.fourt_main_color,
    },
    background_2: {
        position: 'absolute',
        borderRadius: Normalize(100),
        top: -AppStyle.windowSize.height * 0.425,
        width: AppStyle.windowSize.height * 0.425,
        height: AppStyle.windowSize.height * 0.425,
        right: -AppStyle.windowSize.height * 0.425,
        transform: [{ scaleX: 3.25 }, { scaleY: 2.75 }],
        backgroundColor: AppStyle.main_color,
    },
})
