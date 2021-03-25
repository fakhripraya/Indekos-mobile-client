import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    popUpModalChange,
} from '../../redux';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppStyle } from '../../config/app.config';
import { SocialIcon } from 'react-native-elements';
import { trackPromise } from 'react-promise-tracker';
import { AuthService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import RegisterBackground from '../../components/Backgrounds/registration_background';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/",
})

// Register is the root of registration stack
export default function Register({ navigation }) {

    // Variables with regex
    var regWA = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/;
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Function states
    const [inputValue, setInput] = useState('')

    // Hooks
    const dispatch = useDispatch()

    // Functions
    // handle Email validation
    function handleValidateEmail(value) {

        if (regEmail.test(value) === true) {
            return true;
        }

        return false;
    };

    // handle WhatsApp validation
    function handleValidatePhone(value) {

        if (value.length > 8) {
            if (value.includes('+')) {
                var subPhone = value.split('+', 2);
                if (isNaN(subPhone[1])) {
                    return false;
                }
            }
            else {
                if (isNaN(value)) {
                    return false;
                }
            }
        }

        if (regWA.test(value) === true) {
            return true;
        }

        return false;
    };

    // handle registration form submit
    function handleSubmit() {

        // Registration form validation
        var count = 0;

        if (!handleValidatePhone(inputValue)) {
            count++;
        }
        if (!handleValidateEmail(inputValue)) {
            count++;
        }
        if (count == 2) {

            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Invalid Phone number / Email" }));
            return;

        }

        // triggers the http post request to /register url to send an OTP to either WhatsApp or Email based on user input
        trackPromise(
            api.post(
                '/register',
                { username: inputValue }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigation.replace('OTP', {
                            tempUsername: inputValue,
                            tempPassword: '',
                            otpType: 0
                        });
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

    // Renders the Register screen
    return (
        <RegisterBackground>
            <Text style={styles.title}>
                Register
                </Text>
            <View style={styles.inputContainer}>
                <View style={styles.warnMessage}>
                    <Text style={styles.warnMessageText} >
                        Make sure you have whatsapp
                        </Text>
                    <Text style={styles.warnMessageText} >
                        account when you registering your
                        </Text>
                    <Text style={styles.warnMessageText} >
                        phone number
                        </Text>
                </View>
                <View style={styles.authInputWrapper}>
                    <Text style={styles.authInputTitle}>
                        Phone / Email
                        </Text>
                    <View style={styles.authInput}>
                        <TextInput
                            textAlign="left"
                            value={inputValue}
                            onChangeText={(newVal) => setInput(newVal)}
                            style={{ flex: 1, paddingLeft: Normalize(10), fontSize: NormalizeFont(14) }} />
                    </View>
                </View>
                <View style={styles.o2AuthWrapper}>
                    <TouchableOpacityPrevent >
                        <SocialIcon iconSize={Normalize(24)} style={{ width: Normalize(40), height: Normalize(40), borderRadius: Normalize(100), marginRight: Normalize(5) }} button type='google' />
                    </TouchableOpacityPrevent>
                    <TouchableOpacityPrevent >
                        <SocialIcon iconSize={Normalize(24)} style={{ width: Normalize(40), height: Normalize(40), borderRadius: Normalize(100) }} button type='facebook' />
                    </TouchableOpacityPrevent>
                </View>
            </View>
            <View style={styles.submitBtn}>
                <TouchableOpacityPrevent style={{ width: Normalize(125) }} onPress={() => handleSubmit()}>
                    <Text style={[styles.button, { fontWeight: 'bold', backgroundColor: AppStyle.sub_main_color, fontSize: NormalizeFont(16) }]}>
                        Submit
                    </Text>
                </TouchableOpacityPrevent>
            </View>
            <View style={styles.loginBtn}>
                <Text style={{ fontSize: NormalizeFont(14) }} >
                    Have an account ?{' '}
                </Text>
                <TouchableOpacityPrevent onPress={() => { navigation.push('LoginStack'); }} >
                    <Text style={{ color: AppStyle.fourt_main_color, fontSize: NormalizeFont(14) }}>
                        Login
                    </Text>
                </TouchableOpacityPrevent>
            </View>
        </RegisterBackground >
    )
}

// the render elements style
const styles = StyleSheet.create({

    title: {
        right: '10%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: Normalize(60),
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
    warnMessage: {
        width: '100%',
        paddingTop: '5%',
        borderRadius: 15,
        paddingBottom: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        height: Normalize(90),
        backgroundColor: AppStyle.fourt_main_color,
    },
    warnMessageText: {
        color: 'white',
        textAlign: 'center',
        fontSize: NormalizeFont(14),
    },
    authInputWrapper: {
        marginTop: Normalize(25),
        marginBottom: Normalize(10),
    },
    authInputTitle: {
        fontWeight: 'bold',
        bottom: Normalize(5),
        alignSelf: 'flex-start',
        fontSize: NormalizeFont(14),
    },
    authInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        height: Normalize(40),
        alignSelf: 'flex-start',
        borderRadius: Normalize(10),
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    submitBtn: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: Normalize(75),
    },
    loginBtn: {
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
