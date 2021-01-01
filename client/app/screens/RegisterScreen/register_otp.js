import {
    popUpModalChange
} from '../../redux';
import {
    Text,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { HostServer } from '../../config/app.config';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../../components/Backgrounds/registration_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

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
    // Hooks
    const dispatch = useDispatch()
    const tempUsername = useSelector(state => state.accountRegistrationReducer.username);

    // handle otp form submit
    function handleSubmit() {

        // concat all the value
        var res = firstValue.concat(secondValue).concat(thirdValue).concat(fourthValue);

        // validation
        if (res.length < 4)
            return;

        if (isNaN(res))
            return;

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register/check',
                { otp_code: res }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('RegisterFinal');
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

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register',
                { username: tempUsername }
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
                        <Text style={{ fontSize: 16 / Dimensions.get("screen").fontScale }}>
                            Haven't receive a code?{' '}
                        </Text>
                        <TouchableOpacityPrevent onPress={() => handleResend()} >
                            <Text style={{ color: AppStyle.fourt_main_color, fontSize: 16 / Dimensions.get("screen").fontScale }}>
                                Resend Again
                            </Text>
                        </TouchableOpacityPrevent>
                    </View>

                </View>
                <View style={styles.submitBtn}>
                    <TouchableOpacityPrevent style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => navigation.replace('Register')}>
                        <Text style={[styles.button, { backgroundColor: 'white', fontSize: 16 / Dimensions.get("screen").fontScale }]}>
                            <Text style={{ color: AppStyle.fourt_main_color }}>Back</Text>
                        </Text>
                    </TouchableOpacityPrevent>
                    <TouchableOpacityPrevent style={{ width: AppStyle.screenSize.width / 3 }} onPress={() => handleSubmit()}>
                        <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: 16 / Dimensions.get("screen").fontScale }]}>
                            Submit
                        </Text>
                    </TouchableOpacityPrevent>
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
    resendText: {
        flex: 0.15,
        color: 'grey',
        alignSelf: 'center',
        flexDirection: 'row',
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
