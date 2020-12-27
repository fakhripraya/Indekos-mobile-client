import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { SocialIcon, withTheme } from 'react-native-elements';
import { HostServer } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker'
import {
    accountRegistrationChange
} from '../../redux'
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

export default function Register({ navigation }) {
    console.log("punya screem ")
    console.log(AppStyle.screenSize)
    console.log("punya window")
    console.log(AppStyle.windowSize)

    // Redux 
    const dispatch = useDispatch()
    // Function state
    const [inputValue, setInput] = useState('')

    function handleSubmit() {

        dispatch(accountRegistrationChange({ username: inputValue, password: "", otp_code: "" }))
        trackPromise(
            api.post('/register', { username: inputValue })
                .then(response => {
                    // TODO: set the state to logged in
                    console.log(response.status);
                    navigation.push('RegisterOtp');
                })
                .catch(error => {
                    if (error.response.status !== 200) {
                        // TODO: delete after development and change to !== 401
                        console.log(error.response.data.message);
                    }
                }));

    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                    <View style={styles.container}>
                        <View style={styles.backgroundContainer} >
                            <View style={styles.background_1} />
                            <View style={styles.background_2} />
                        </View>
                        <View style={styles.backgroundContainer_2} >
                            <View style={styles.wrapper}>
                                <View style={styles.inputContainer}>
                                    <View style={styles.warnMessage}>
                                        <Text style={{ fontSize: 14 - (AppStyle.font_scaled_ratio * 14), textAlign: 'center', color: 'white' }} >
                                            Make sure you have whatsapp
                                        </Text>
                                        <Text style={{ fontSize: 14 - (AppStyle.font_scaled_ratio * 14), textAlign: 'center', color: 'white' }} >
                                            account when you logging in with
                                        </Text>
                                        <Text style={{ fontSize: 14 - (AppStyle.font_scaled_ratio * 14), textAlign: 'center', color: 'white' }} >
                                            phone number
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14 - (AppStyle.font_scaled_ratio * 14), alignSelf: 'flex-start', bottom: 5 }}>
                                            Phone / Email
                                        </Text>
                                        <View style={styles.authInput}>
                                            <TextInput
                                                onChangeText={(newVal) => setInput(newVal)}
                                                value={inputValue}
                                                textAlign="center"
                                                style={{ flex: 1, fontSize: 16 }} />
                                        </View>
                                    </View>
                                    <View style={styles.o2AuthWrapper}>
                                        <TouchableOpacity style={
                                            {
                                                width: AppStyle.screenSize.width / 6,
                                                marginRight: 5
                                            }
                                        }>
                                            <SocialIcon
                                                button
                                                type='google'
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={
                                            { width: AppStyle.screenSize.width / 6 }
                                        }>
                                            <SocialIcon
                                                button
                                                type='facebook'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.submitBtn}>
                                    <TouchableOpacity style={
                                        { width: AppStyle.screenSize.width / 3 }
                                    }
                                        onPress={() =>
                                            handleSubmit()
                                        }>
                                        <Text
                                            style={
                                                [
                                                    styles.button,
                                                    {
                                                        backgroundColor: AppStyle.sub_main_color,
                                                        fontSize: 16 - (AppStyle.font_scaled_ratio * 16),
                                                    }
                                                ]
                                            }>
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.loginBtn}>
                                    <Text style={{
                                        fontSize: 14 - (AppStyle.font_scaled_ratio * 12),
                                    }} >
                                        Have an account ? <Text style={{ color: AppStyle.fourt_main_color }}>login</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
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
        height: AppStyle.screenSize.height * 0.3,
        width: AppStyle.screenSize.width * 0.6,
        top: (AppStyle.screenSize.height * 0.2),
        right: (AppStyle.screenSize.width * 0.70),
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 200 / 2,
        backgroundColor: AppStyle.fourt_main_color
    },
    background_2: {
        height: AppStyle.screenSize.height * 0.3,
        width: AppStyle.screenSize.width * 0.9,
        transform: [{ scaleX: 2 }, { scaleY: 3 }, { rotate: '5deg' }],
        left: (AppStyle.screenSize.width) * 0.6,
        bottom: (AppStyle.screenSize.height * 0.375),
        position: 'absolute',
        borderRadius: 300 / 2,
        backgroundColor: AppStyle.main_color
    },
    wrapper: {
        flex: 1,
        bottom: 20,
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputContainer: {
        maxWidth: AppStyle.screenSize.width - (AppStyle.screenSize.width * 0.1),
        maxHeight: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.5),
        flex: 7,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        bottom: AppStyle.screenSize.height / 4.5
    },
    warnMessage: {
        maxWidth: AppStyle.screenSize.width * 0.75,
        maxHeight: AppStyle.screenSize.height * 0.25,
        width: AppStyle.screenSize.width * 0.75,
        paddingTop: '5%',
        backgroundColor: AppStyle.fourt_main_color,
        paddingBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    authInput: {
        alignSelf: 'flex-start',
        maxWidth: AppStyle.screenSize.width * 0.75,
        maxHeight: AppStyle.screenSize.height * 0.10,
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
        bottom: AppStyle.screenSize.height / 7
    },
    loginBtn: {
        flex: 1,
        flexDirection: 'row',
        bottom: AppStyle.screenSize.height / 9
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
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
