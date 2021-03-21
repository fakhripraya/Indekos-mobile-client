import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { AppStyle, UserService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { FirstBackground } from '../../components/Backgrounds/create_user_background'

// creates the promised base http client
const api = axios.create({
    baseURL: "http://" + UserService.host + UserService.port + "/"
})

export default function PickRole({ route, navigation }) {

    // Get navigation parameter
    const tempDisplayName = route.params.tempDisplayName

    // Hooks
    const dispatch = useDispatch()

    // triggers the http patch request to /update/signed url to update the created user role
    function handleSubmit(roleId) {

        // roleId = 1 (user)
        // roleId = 2 (owner)

        if (roleId === 1) {
            // if owner, finish the user creation and navigate to home screen
            trackPromise(
                api.patch('/update/signed', {
                    displayname: tempDisplayName,
                    role_id: roleId,
                })
                    .then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            navigation.replace('AppStack');
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 401)
                            // go to welcome screen if user is not authorized
                            navigation.replace('WelcomeStack');
                        else
                            // dispatch the popUpModalChange actions to store the generic message modal state
                            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                    })
            );
        } else
            // if owner, navigate to owner
            navigation.replace('Agreement', {
                tempDisplayname: tempDisplayName,
                tempUserRoleID: roleId
            });
    }

    return (
        <FirstBackground>
            <View style={styles.wrapper}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(18) }}>I want to register in <Text style={{ color: AppStyle.fourt_main_color }}>as</Text></Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={() => handleSubmit(1)}>
                        <View style={[styles.button, { backgroundColor: AppStyle.fourt_main_color }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>User</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSubmit(2)}>
                        <View style={[styles.button, { backgroundColor: 'white' }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Owner</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <View style={[styles.submitButton, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Submit</Text>
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
        paddingRight: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: Normalize(20),
        width: AppStyle.screenSize.width * 0.35,
        height: AppStyle.screenSize.height * 0.125,
        marginLeft: AppStyle.screenSize.width * 0.025,
        marginRight: AppStyle.screenSize.width * 0.025,
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: 'grey',
        justifyContent: 'center',
        borderRadius: Normalize(50),
        width: AppStyle.screenSize.width * 0.4,
        height: AppStyle.screenSize.height * 0.075,
    }
})
