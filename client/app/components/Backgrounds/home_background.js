import React from 'react';
import { AppStyle } from '../../config/app.config';
import { Normalize } from '../../functions/normalize';
import { View, StyleSheet, ScrollView, } from 'react-native';

// HomeBackground is the background image for the home stack
export default function HomeBackground(props) {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ width: '100%', height: AppStyle.windowSize.height }}>
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
        width: AppStyle.windowSize.width,
        backgroundColor: AppStyle.main_color,
        height: AppStyle.windowSize.height * 0.3,
    },
    background_3: {
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        width: AppStyle.windowSize.width,
        top: (AppStyle.windowSize.height * 0.4),
        height: AppStyle.windowSize.height * 0.3,
    },
    background_1: {
        position: 'absolute',
        borderRadius: Normalize(300),
        top: -AppStyle.windowSize.height * 0.15,
        width: AppStyle.windowSize.height * 0.25,
        left: -AppStyle.windowSize.height * 0.15,
        height: AppStyle.windowSize.height * 0.25,
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
        backgroundColor: AppStyle.fourt_main_color,
    },
    background_2: {
        position: 'absolute',
        borderRadius: Normalize(300),
        top: -AppStyle.windowSize.height * 0.15,
        width: AppStyle.windowSize.height * 0.3,
        height: AppStyle.windowSize.height * 0.3,
        left: -AppStyle.windowSize.height * 0.15,
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
        backgroundColor: AppStyle.third_main_color,
    },
})
