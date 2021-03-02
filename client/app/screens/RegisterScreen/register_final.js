import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    popUpModalChange
} from '../../redux'
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { AuthService } from '../../config/app.config';
import { AppStyle, Normalize } from '../../config/app.config';
import Background from '../../components/Backgrounds/registration_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// RegisterFinal is the final screen of the registration stack
export default function RegisterFinal({ route, navigation }) {

    // Get navigation parameter
    const tempUsername = route.params.tempUsername;

    // Function state
    const [passwordValue, setPassword] = useState('')
    const [confirmPasswordValue, setConfirmPassword] = useState('')
    const [popFlag, setPopFlag] = useState('none')
    const [popMessage, setPopMessage] = useState('')
    const [popColor, setPopColor] = useState(AppStyle.error)

    // Hooks
    const dispatch = useDispatch()

    // Determine the password level
    // Weak / standard / Strong
    // TODO: belum di implementasi
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
        if (confirmPasswordValue !== passwordValue) {

            // dispatch the popUpModalChange actions to store the generic message modal state
            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: "Password confirmation does not match" }));
            return;
        }

        // triggers the http post request to /register/create url to finish the user registration process 
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
                        <Text style={[styles.button, { backgroundColor: AppStyle.sub_main_color, fontSize: Normalize(14), fontWeight: 'bold' }]}>
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
        fontSize: Normalize(32),
        bottom: AppStyle.screenSize.height / 4,
    },
    inputContainer: {
        elevation: 5,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Normalize(15),
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
        fontWeight: 'bold',
        bottom: Normalize(5),
        fontSize: Normalize(14),
        alignSelf: 'flex-start',
    },
    authInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderRadius: Normalize(10),
        height: AppStyle.screenSize.height * 0.06,
    },
    authInputText: {
        flex: 1,
        fontSize: Normalize(14),
        paddingLeft: Normalize(10),
    },
    o2AuthWrapper: {
        flexDirection: 'row',
    },
    submitBtn: {
        flex: 1,
        bottom: AppStyle.screenSize.height / 7,
    },
    button: {
        color: 'white',
        textAlign: 'center',
        paddingTop: Normalize(15),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(15),
    },
})
