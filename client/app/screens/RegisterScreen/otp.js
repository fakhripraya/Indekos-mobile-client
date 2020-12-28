import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';
import { AppStyle } from '../../config/app.config';
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

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

// Register is the root of registration stack
export default function Register({ navigation }) {

    // Redux dispatch
    const dispatch = useDispatch()
    // Function refs
    const firstField = useRef(null);
    const secondField = useRef(null);
    const thirdField = useRef(null);
    const fourthField = useRef(null);
    // Function state
    const [inputValue, setInput] = useState('')

    // handle registration form submit
    function handleSubmit() {

        // dispatch the accountRegistrationChange actions to store new user credentials  
        dispatch(accountRegistrationChange({ username: inputValue, password: "", otp_code: "" }))

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register',
                { username: inputValue }
            )
                .then(response => {
                    if (response.status === 200) {
                        navigation.push('RegisterFinal');
                    }
                })
                .catch(error => {
                    if (error.response.status !== 200) {
                        // TODO: development only, delete when development done
                        console.log(error.response.data.message);
                    }
                })
        );
    }

    // Renders the Register screen
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
                        <View style={styles.wrapper}>
                            <View style={styles.inputContainer}>
                                <View style={styles.otpWrapper}>
                                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold', fontSize: 14 - (AppStyle.font_scaled_ratio * 14) }}>
                                        OTP Number
                                    </Text>
                                    <View style={styles.otpFieldContainer}>
                                        <View style={styles.otpField} onPress={() => { firstField.current.focus(); }}>
                                            <TextInput
                                                ref={firstField}
                                                onChangeText={(newVal) => setInput(newVal)}
                                                value={inputValue}
                                                textAlign="center"
                                                style={{ height: '100%', width: '100%', flex: 1, fontSize: 32 - (AppStyle.font_scaled_ratio * 32) }} />
                                        </View>
                                        <View style={styles.otpField} ref={secondField}>
                                            <TextInput
                                                onChangeText={(newVal) => setInput(newVal)}
                                                value={inputValue}
                                                textAlign="center"
                                                style={{ height: '100%', width: '100%', flex: 1, fontSize: 32 - (AppStyle.font_scaled_ratio * 32) }} />
                                        </View>
                                        <View style={styles.otpField} ref={thirdField}>
                                            <TextInput
                                                onChangeText={(newVal) => setInput(newVal)}
                                                value={inputValue}
                                                textAlign="center"
                                                style={{ height: '100%', width: '100%', flex: 1, fontSize: 32 - (AppStyle.font_scaled_ratio * 32) }} />
                                        </View>
                                        <View style={styles.otpField} ref={fourthField}>
                                            <TextInput
                                                onChangeText={(newVal) => setInput(newVal)}
                                                value={inputValue}
                                                textAlign="center"
                                                style={{ height: '100%', width: '100%', flex: 1, fontSize: 32 - (AppStyle.font_scaled_ratio * 32) }} />
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ flex: 0.15, color: 'grey', alignSelf: 'center', fontSize: 16 - (AppStyle.font_scaled_ratio * 16) }} >
                                    Haven't receive a code? <Text style={{ color: AppStyle.fourt_main_color }}>Resend Again</Text>
                                </Text>
                            </View>
                            <View style={styles.submitBtn}>
                                <TouchableOpacity style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => navigation.goBack()}>
                                    <Text style={[styles.button, { backgroundColor: 'white', fontSize: 16 - (AppStyle.font_scaled_ratio * 16) }]}>
                                        <Text style={{ color: AppStyle.fourt_main_color }}>Back</Text>
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => handleSubmit()}>
                                    <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: 16 - (AppStyle.font_scaled_ratio * 16) }]}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
    wrapper: {
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        top: AppStyle.screenSize.height * 0.4675,
    },
    inputContainer: {
        flex: 3,
        elevation: 5,
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 4.5,
        maxWidth: AppStyle.screenSize.width - (AppStyle.screenSize.width * 0.1),
        maxHeight: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.55),
    },
    otpWrapper: {
        flex: 0.6,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    otpFieldContainer: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    otpField: {
        width: '22.5%',
        height: '100%',
        borderWidth: 0.7,
        borderRadius: 10,
        borderColor: 'grey',
    },
    submitBtn: {
        flex: 1,
        flexDirection: 'row',
        bottom: AppStyle.screenSize.height / 7,
    },
    button: {
        paddingTop: 15,
        color: 'white',
        borderRadius: 50,
        paddingBottom: 15,
        textAlign: 'center',
        borderColor: 'white',
    },
})
