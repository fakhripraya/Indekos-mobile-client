import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { AppStyle } from '../../config/app.config';
import { FirstBackground } from '../../components/Backgrounds/create_user_background'

export default function PickRole({ navigation }) {
    return (
        <FirstBackground>
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 / Dimensions.get("screen").fontScale }}>I want to register in <Text style={{ color: AppStyle.fourt_main_color }}>as</Text></Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={() => { navigation.replace('AppStack') }}>
                        <View style={[styles.button, { backgroundColor: AppStyle.fourt_main_color }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 / Dimensions.get("screen").fontScale }}>User</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.replace('Agreement') }}>
                        <View style={[styles.button, { backgroundColor: 'white' }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 / Dimensions.get("screen").fontScale }}>Owner</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View style={[styles.submitButton, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </FirstBackground>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: AppStyle.screenSize.height * 0.45,
        bottom: AppStyle.screenSize.height * 0.35,
    },
    buttonWrapper: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 20,
        paddingRight: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.35,
        height: AppStyle.screenSize.height * 0.125,
        marginLeft: AppStyle.screenSize.width * 0.025,
        marginRight: AppStyle.screenSize.width * 0.025,
    },
    submitButton: {
        alignItems: 'center',
        borderRadius: 100 / 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.4,
        height: AppStyle.screenSize.height * 0.075,
    }
})
