import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import React from 'react';
import { AppStyle, Normalize } from '../../config/app.config';

// SearchBackground is the background image for the search screen
export default function SearchBackground(props) {
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                <View style={styles.backgroundContainer} >
                    <View style={styles.background_2} />
                    <View style={styles.background_1} />
                    <View style={styles.background_3} />
                </View>
                {props.children}
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
        width: AppStyle.screenSize.width,
        backgroundColor: AppStyle.main_color,
        height: AppStyle.screenSize.height * 0.275,
    },
    background_3: {
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height,
        top: (AppStyle.screenSize.height * 0.275),
    },
    background_1: {
        position: 'absolute',
        borderRadius: Normalize(300),
        top: AppStyle.screenSize.height * 0.025,
        width: AppStyle.screenSize.height * 0.225,
        right: -AppStyle.screenSize.height * 0.175,
        height: AppStyle.screenSize.height * 0.225,
        backgroundColor: AppStyle.fourt_main_color,
        transform: [{ scaleX: 1 }, { scaleY: 1.25 }],
    },
    background_2: {
        position: 'absolute',
        borderRadius: Normalize(300),
        top: AppStyle.screenSize.height * 0.1375,
        width: AppStyle.screenSize.height * 0.3,
        height: AppStyle.screenSize.height * 0.3,
        left: -AppStyle.screenSize.height * 0.15,
        transform: [{ scaleX: 2.5 }, { scaleY: 2 }],
        backgroundColor: AppStyle.third_main_color,
    },
})
