import {
    Text,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { HostServer } from '../../config/app.config';
import React, { useState, useRef, useEffect } from 'react';
import Background from '../../components/Backgrounds/registration_background'

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + HostServer.host + HostServer.port + "/"
})

// RegisterOtp is the screen to handle the otp process of the registration flow
export default function RegisterOtp({ navigation }) {

    // Function refs
    const firstField = useRef(null);
    const secondField = useRef(null);
    const thirdField = useRef(null);
    const fourthField = useRef(null);
    // Function states
    const [firstValue, setFirstInput] = useState("")
    const [secondValue, setSecondInput] = useState("")
    const [thirdValue, setThirdInput] = useState("")
    const [fourthValue, setFourthInput] = useState("")

    // handle otp form submit
    function handleSubmit() {

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register/check',
                { otp_code: '9999' }
            )
                .then(response => {
                    if (response.status === 200) {
                        navigation.replace('RegisterFinal');
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

    // Renders the RegisterOtp screen
    return (
        <Background>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Register
                </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.otpWrapper}>
                        <Text style={styles.otpWrapperText}>
                            OTP Number
                        </Text>
                        <View style={styles.otpFieldContainer}>
                            <View style={styles.otpField}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={firstField}
                                    selectTextOnFocus={true}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            firstField.current.focus();
                                        }
                                    }}
                                    onChangeText={newVal => {
                                        setFirstInput(newVal);
                                        if (newVal !== '') {
                                            secondField.current.focus();
                                        }
                                    }}
                                    maxLength={1}
                                    textAlign="center"
                                    style={styles.otpFieldInput} />
                            </View>
                            <View style={styles.otpField}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={secondField}
                                    selectTextOnFocus={true}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            firstField.current.focus();
                                        }
                                    }}
                                    onChangeText={(newVal) => {
                                        setSecondInput(newVal);
                                        if (newVal !== '') {
                                            thirdField.current.focus();
                                        }
                                    }}
                                    maxLength={1}
                                    textAlign="center"
                                    style={styles.otpFieldInput} />
                            </View>
                            <View style={styles.otpField}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={thirdField}
                                    selectTextOnFocus={true}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            secondField.current.focus();
                                        }
                                    }}
                                    onChangeText={(newVal) => {
                                        setThirdInput(newVal);
                                        if (newVal !== '') {
                                            fourthField.current.focus();
                                        }
                                    }}
                                    maxLength={1}
                                    textAlign="center"
                                    style={styles.otpFieldInput} />
                            </View>
                            <View style={styles.otpField}>
                                <TextInput
                                    keyboardType="numeric"
                                    ref={fourthField}
                                    selectTextOnFocus={true}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            thirdField.current.focus();
                                        }
                                    }}
                                    onChangeText={(newVal) => {
                                        setFourthInput(newVal);
                                    }}
                                    maxLength={1}
                                    textAlign="center"
                                    style={styles.otpFieldInput} />
                            </View>
                        </View>
                    </View>
                    <Text style={{ flex: 0.15, color: 'grey', alignSelf: 'center', fontSize: 16 / Dimensions.get("screen").fontScale }} >
                        Haven't receive a code? <Text style={{ color: AppStyle.fourt_main_color }}>Resend Again</Text>
                    </Text>
                </View>
                <View style={styles.submitBtn}>
                    <TouchableOpacity style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => navigation.replace('Register')}>
                        <Text style={[styles.button, { backgroundColor: 'white', fontSize: 16 / Dimensions.get("screen").fontScale }]}>
                            <Text style={{ color: AppStyle.fourt_main_color }}>Back</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => handleSubmit()}>
                        <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: 16 / Dimensions.get("screen").fontScale }]}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Background >
    )
}

// the render elements style
const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        top: AppStyle.screenSize.height * 0.375,
    },
    title: {
        right: '5%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        bottom: AppStyle.screenSize.height / 4,
        fontSize: 32 / Dimensions.get("screen").fontScale
    },
    inputContainer: {
        elevation: 5,
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 4.5,
        width: AppStyle.screenSize.width - (AppStyle.screenSize.width * 0.1),
        height: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.662),
    },
    otpWrapper: {
        flex: 0.6,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    otpWrapperText: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: 14 / Dimensions.get("screen").fontScale,
    },
    otpFieldContainer: {
        height: '70%',
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
    otpFieldInput: {
        flex: 1,
        width: '100%',
        height: '100%',
        fontSize: 32 / Dimensions.get("screen").fontScale
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
