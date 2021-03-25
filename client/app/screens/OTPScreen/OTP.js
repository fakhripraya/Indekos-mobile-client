import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    popUpModalChange
} from '../../redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { AuthService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import OTPBackground from '../../components/Backgrounds/registration_background';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// OTP is the screen to handle the otp process of the registration flow
export default function OTP({ route, navigation }) {

    // Get navigation parameter
    const tempUsername = route.params.tempUsername;
    const tempPassword = route.params.tempPassword;
    const otpType = route.params.otpType;

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

    // define url and param
    let url = '';
    let resendUrl = '';

    switch (otpType) {
        case 0:
            url = '/register/check'
            resendUrl = '/register'
            break;
        case 1:
            url = '/login/check'
            resendUrl = '/login'
            break;
        default:
            url = '/register/check'
            resendUrl = resendUrl = '/register'
    }

    // Hooks
    const dispatch = useDispatch()

    // handle otp form submit
    function handleSubmit() {

        // concat all the value
        var res = firstValue.concat(secondValue).concat(thirdValue).concat(fourthValue);

        // validation
        if (res.length < 4)
            return;

        if (isNaN(res))
            return;

        let param = {};
        switch (otpType) {
            case 0:
                param = {
                    otp_code: res
                }
                break;
            case 1:
                param = {
                    username: tempUsername,
                    otp_code: res
                }
                break;
            default:
                param = {
                    otp_code: res
                }
        }

        // check the OTP, if OTP valid, navigate to the screen based on the OTP type
        trackPromise(
            api.post(
                url,
                param
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {

                        // 0 = register
                        // 1 = login
                        if (otpType === 0) {
                            navigation.replace('RegisterFinal', {
                                tempUsername: tempUsername,
                            });
                        } else if (otpType === 1) {
                            navigation.replace('AppStack');
                        }

                    }
                })
                .catch(error => {
                    if (error.response.status !== 200) {

                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                    }
                })
        );

    }

    // handle resend otp code
    function handleResend() {

        let param = {};
        switch (otpType) {
            case 0:
                param = {
                    username: tempUsername
                }
                break;
            case 1:
                param = {
                    username: tempUsername,
                    password: tempPassword
                }
                break;
            default:
                param = {
                    username: tempUsername
                }
        }

        // Resend the OTP code based on the OTP type
        trackPromise(
            api.post(
                resendUrl,
                param
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {

                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'INFO', message: "Successfully resend otp code" }));
                    }
                })
                .catch(error => {
                    if (error.response.status !== 200) {

                        // dispatch the popUpModalChange actions to store the generic message modal state
                        dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                    }
                })
        );

    }

    function handleBack() {

        if (otpType === 0) {
            navigation.replace('Register')
        } else if (otpType === 1) {
            navigation.replace('Login')
        }

    }

    // Renders the OTP screen
    return (
        <OTPBackground>
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
                                autoFocus={true}
                                selectTextOnFocus={true}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace')
                                        firstField.current.focus();
                                }}
                                onChangeText={newVal => {
                                    if (isNaN(newVal) || newVal === ' ')
                                        firstField.current.focus();
                                    else {
                                        setFirstInput(newVal);
                                        if (newVal !== '')
                                            secondField.current.focus();
                                    }
                                }}
                                onSelectionChange={({ nativeEvent }) => {
                                    if (nativeEvent.selection.start === 0 && nativeEvent.selection.end === 1)
                                        return;
                                    if (nativeEvent.selection.start === 1 && nativeEvent.selection.end === 1)
                                        secondField.current.focus();
                                }}
                                value={firstValue}
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
                                    if (nativeEvent.key === 'Backspace')
                                        firstField.current.focus();
                                }}
                                onChangeText={(newVal) => {
                                    if (isNaN(newVal) || newVal === ' ')
                                        secondField.current.focus();
                                    else {
                                        setSecondInput(newVal);
                                        if (newVal !== '')
                                            thirdField.current.focus();
                                    }
                                }}
                                onSelectionChange={({ nativeEvent }) => {
                                    if (nativeEvent.selection.start === 0 && nativeEvent.selection.end === 1)
                                        return
                                    if (nativeEvent.selection.start === 1 && nativeEvent.selection.end === 1)
                                        thirdField.current.focus();
                                }}
                                value={secondValue}
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
                                    if (nativeEvent.key === 'Backspace')
                                        secondField.current.focus();
                                }}
                                onChangeText={(newVal) => {
                                    if (isNaN(newVal) || newVal === ' ')
                                        thirdField.current.focus();
                                    else {
                                        setThirdInput(newVal);
                                        if (newVal !== '')
                                            fourthField.current.focus();
                                    }
                                }}
                                onSelectionChange={({ nativeEvent }) => {
                                    if (nativeEvent.selection.start === 0 && nativeEvent.selection.end === 1)
                                        return;
                                    if (nativeEvent.selection.start === 1 && nativeEvent.selection.end === 1)
                                        fourthField.current.focus();
                                }}
                                value={thirdValue}
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
                                    if (nativeEvent.key === 'Backspace')
                                        thirdField.current.focus();
                                }}
                                onChangeText={(newVal) => {
                                    if (isNaN(newVal) || newVal === ' ')
                                        fourthField.current.focus();
                                    else
                                        setFourthInput(newVal);
                                }}
                                value={fourthValue}
                                maxLength={1}
                                textAlign="center"
                                style={styles.otpFieldInput} />
                        </View>
                    </View>
                </View>
                <View style={styles.resendText}>
                    <Text style={{ fontSize: NormalizeFont(14), color: 'gray' }}>
                        Haven't receive a code?{' '}
                    </Text>
                    <TouchableOpacityPrevent onPress={() => handleResend()} >
                        <Text style={{ color: AppStyle.fourt_main_color, fontSize: NormalizeFont(14) }}>
                            Resend Again
                            </Text>
                    </TouchableOpacityPrevent>
                </View>

            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacityPrevent style={{ width: Normalize(100) }} onPress={() => handleBack()}>
                    <Text style={[styles.button, { backgroundColor: 'white', fontSize: NormalizeFont(14), fontWeight: 'bold', }]}>
                        <Text style={{ color: AppStyle.fourt_main_color }}>Back</Text>
                    </Text>
                </TouchableOpacityPrevent>
                <TouchableOpacityPrevent style={{ width: Normalize(100) }} onPress={() => handleSubmit()}>
                    <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(14), fontWeight: 'bold', }]}>
                        Submit
                    </Text>
                </TouchableOpacityPrevent>
            </View>
        </OTPBackground >
    )
}

// the render elements style
const styles = StyleSheet.create({

    title: {
        right: '10%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: Normalize(80),
        fontSize: NormalizeFont(32),
    },
    inputContainer: {
        elevation: 5,
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: Normalize(10),
        borderRadius: Normalize(15),
        justifyContent: 'space-evenly',
        width: AppStyle.windowSize.width * 0.9,
    },
    otpWrapper: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    otpWrapperText: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: NormalizeFont(14),
        marginBottom: Normalize(10),
    },
    otpFieldContainer: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(100),
        justifyContent: 'space-around',
    },
    otpField: {
        width: '22.5%',
        height: '100%',
        borderColor: 'grey',
        borderWidth: Normalize(3),
        borderRadius: Normalize(10),
    },
    otpFieldInput: {
        width: '100%',
        height: '100%',
        fontSize: NormalizeFont(32),
    },
    resendText: {
        color: 'grey',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: Normalize(10),
    },
    submitBtn: {
        alignSelf: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: Normalize(25),
    },
    button: {
        color: 'white',
        textAlign: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
    },
})
