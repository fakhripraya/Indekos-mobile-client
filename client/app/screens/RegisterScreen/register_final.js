import {
    Text,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    popUpModalChange,
    accountRegistrationChange
} from '../../redux'
import axios from 'axios';
import React, { useState } from 'react';
import { AppStyle } from '../../config/app.config';
import { trackPromise } from 'react-promise-tracker';
import { AuthService } from '../../config/app.config';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../../components/Backgrounds/registration_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// RegisterFinal is the final screen of the registration stack
export default function RegisterFinal({ navigation }) {

    // Function state
    const [passwordValue, setPassword] = useState('')
    const [confirmPasswordValue, setConfirmPassword] = useState('')
    const [popFlag, setPopFlag] = useState('none')
    const [popMessage, setPopMessage] = useState('')
    const [popColor, setPopColor] = useState(AppStyle.error)
    // Hooks
    const dispatch = useDispatch()
    const tempUsername = useSelector(state => state.accountRegistrationReducer.username);

    function onChangePassword(value) {

        let PasswordLevel = 0;

        var backslash = new RegExp("\\\\", "");

        if (value.length > 6) {
            if ((backslash.test(value) || /[$-/:-@{-~!-#^_`[\]]/.test(value)) && /[a-zA-Z\s]+/.test(value)) {
                PasswordLevel = PasswordLevel + 1;
            }
            if (/\d/.test(value) && /[a-zA-Z\s]+/.test(value)) {
                PasswordLevel = PasswordLevel + 1;
            }
        }

        setPassword(value)

        if (value === '') {
            setPopFlag('none')
        }
        else if (PasswordLevel === 0) {
            setPopFlag('flex')
            setPopMessage('Password anda sangat lemah.')
            setPopColor(AppStyle.error)
        }
        else if (PasswordLevel === 1) {
            setPopFlag('flex')
            setPopMessage('Password anda lemah.')
            setPopColor(AppStyle.warning)
        }
        else if (PasswordLevel === 2) {
            setPopFlag('flex')
            setPopMessage('Password anda kuat.')
            setPopColor(AppStyle.success)
        }
    }

    // handle the process of assign password flow
    function handleSubmit() {

        // validation
        // TODO: password validation for weak,standard,strong password

        if (confirmPasswordValue !== passwordValue) {

            // dispatch the popUpModalChange actions to store the generic message modal state
            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Password confirmation does not match" }));
            return;
        }

        // triggers the http post request to /register url in the authentication service to process the registration
        trackPromise(
            api.post(
                '/register/create',
                {
                    username: tempUsername,
                    password: passwordValue
                }
            )
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {

                        // clear the account registration state  
                        dispatch(accountRegistrationChange({ username: "", password: "", otp_code: "" }))
                        navigation.replace('CreateUserStack');
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

    // Renders the RegisterFinal screen
    return (
        <Background>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Register
                </Text>
                <View style={styles.inputContainer}>
                    <View style={styles.authInputWrapper}>
                        <Text style={styles.authInputTitle}>
                            Password
                        </Text>
                        <View style={styles.authInput}>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(newVal) => { onChangePassword(newVal) }}
                                value={passwordValue}
                                textAlign="left"
                                style={styles.authInputText} />
                        </View>
                    </View>
                    <View style={styles.authInputWrapper}>
                        <Text style={styles.authInputTitle}>
                            Confirm Password
                        </Text>
                        <View style={styles.authInput}>
                            <TextInput
                                secureTextEntry={true}
                                onChangeText={(newVal) => setConfirmPassword(newVal)}
                                value={confirmPasswordValue}
                                textAlign="left"
                                style={styles.authInputText} />
                        </View>
                    </View>
                </View>
                <View style={styles.submitBtn}>
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
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'column',
        top: AppStyle.screenSize.height * 0.375,
    },
    title: {
        right: '5%',
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        bottom: AppStyle.screenSize.height / 4,
        fontSize: 32 / Dimensions.get("screen").fontScale,
    },
    inputContainer: {
        elevation: 5,
        borderRadius: 15,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 4.5,
        width: AppStyle.screenSize.width - (AppStyle.screenSize.width * 0.1),
        height: AppStyle.screenSize.height - (AppStyle.screenSize.height * 0.6525),
    },
    authInputWrapper: {
        width: '100%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    authInputTitle: {
        bottom: 5,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: 14 / Dimensions.get("screen").fontScale,
    },
    authInput: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 7.5,
        borderColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        height: AppStyle.screenSize.height * 0.075,
    },
    authInputText: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16 / Dimensions.get("screen").fontScale,
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    textWarningWrapper: {
        flex: 1,
        bottom: AppStyle.screenSize.height / 6,
    },
    textWarning: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    submitBtn: {
        flex: 1,
        bottom: AppStyle.screenSize.height / 7,
    },
    button: {
        paddingTop: 15,
        color: 'white',
        borderRadius: 50,
        paddingBottom: 15,
        textAlign: 'center',
    },
})
