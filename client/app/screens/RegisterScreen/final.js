import React from 'react';
import { AppStyle } from '../../config/app.config';
import { SocialIcon } from 'react-native-elements';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default function RegisterFinal({ navigation }) {

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: AppStyle.windowSize.height }}>
                    <View style={styles.container}>
                        <View style={styles.backgroundContainer} >
                            <View style={styles.background_1} />
                            <View style={styles.background_2} />
                        </View>
                        <View style={styles.backgroundContainer_2} >
                            <View style={styles.wrapper}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.warnMessage}>
                                        <Text style={{ textAlign: 'center', color: 'white' }} >
                                            Make sure you have whatsapp
                                        </Text>
                                        <Text style={{ textAlign: 'center', color: 'white' }} >
                                            account when you logging in with
                                        </Text>
                                        <Text style={{ textAlign: 'center', color: 'white' }} >
                                            phone number
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ alignSelf: 'flex-start', bottom: 5 }}>
                                            Phone / Email
                                        </Text>
                                        <View style={styles.authInput}>
                                            <TextInput textAlign="center" style={{ flex: 1, fontSize: 16 }} />
                                        </View>
                                    </View>
                                    <View style={styles.o2AuthWrapper}>
                                        <TouchableOpacity style={{
                                            width: AppStyle.screenSize.width / 6,
                                            marginRight: 5
                                        }}>
                                            <SocialIcon
                                                button
                                                type='google'
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            width: AppStyle.screenSize.width / 6,
                                        }}>
                                            <SocialIcon
                                                button
                                                type='facebook'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.submitBtn}>
                                    <TouchableOpacity style={{
                                        width: AppStyle.screenSize.width / 3,
                                    }}>
                                        <Text
                                            style={
                                                [
                                                    styles.button,
                                                    { backgroundColor: AppStyle.sub_main_color }
                                                ]
                                            }>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.loginBtn}>
                                    <Text >
                                        Have an account ? <Text style={{ color: AppStyle.fourt_main_color }}>login</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backgroundContainer: {
        flex: 0.40,
        backgroundColor: AppStyle.third_main_color
    },
    backgroundContainer_2: {
        flex: 0.60,
        backgroundColor: 'white'
    },
    background_1: {
        height: 100,
        width: 100,
        top: (AppStyle.screenSize.height * 0.45) - 100,
        transform: [{ scale: AppStyle.screenSize.scale / 2 }],
        position: 'absolute',
        alignSelf: 'flex-start',
        borderRadius: 100 / 2,
        backgroundColor: AppStyle.fourt_main_color
    },
    background_2: {
        height: 100,
        width: 100,
        transform: [{ scale: AppStyle.screenSize.scale * 2 }],
        left: (AppStyle.screenSize.width) * 0.8,
        bottom: (AppStyle.screenSize.height * 0.45),
        position: 'absolute',
        alignSelf: 'flex-end',
        borderRadius: 100 / 2,
        backgroundColor: AppStyle.main_color
    },
    wrapper: {
        flex: 1,
        bottom: 20,
        alignItems: 'center',
        flexDirection: 'column'
    },
    inputContainer: {
        flex: 7,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        bottom: AppStyle.screenSize.height / 5
    },
    warnMessage: {
        paddingTop: '5%',
        backgroundColor: AppStyle.fourt_main_color,
        paddingBottom: '5%',
        paddingRight: '13%',
        paddingLeft: '13%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    authInput: {
        alignSelf: 'flex-start',
        width: '90%',
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7.5,
        flexDirection: 'row',
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    submitBtn: {
        flex: 1,
        bottom: AppStyle.screenSize.height / 6
    },
    loginBtn: {
        flex: 1,
        flexDirection: 'row',
        bottom: AppStyle.screenSize.height / 8
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 50,
        borderColor: '#fff'
    },
    authButton: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 10,
        borderColor: '#fff'
    }
})
