import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import React from 'react';
import HomeBackground from '../../components/Backgrounds/home_background';

export default function Home({ navigation }) {
    return (
        <HomeBackground >
            {/* <View style={styles.container}>
                <Text>Home Screen</Text>
            </View> */}
        </HomeBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
