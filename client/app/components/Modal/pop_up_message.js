import {
    View,
    Text,
    Modal,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import React from 'react';
import { popUpModalChange } from '../../redux';
import { AppStyle } from '../../config/app.config';
import { useSelector, useDispatch } from 'react-redux';
import { Normalize, NormalizeFont } from '../../functions/normalize';

// PopUpMessage is a pop up that shows the generic message to be understandable by the user
export function PopUpMessage() {

    // Function Hooks
    const dispatch = useDispatch();
    const show = useSelector(state => state.popUpModalReducer.show);
    const title = useSelector(state => state.popUpModalReducer.title);
    const message = useSelector(state => state.popUpModalReducer.message);

    // Functions
    function handleMessage() {
        dispatch(popUpModalChange({ show: false, title: '', message: '' }))
    }

    // Renders the pop up message component
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            style={styles.modal}
        >
            <View style={styles.spinner}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.messageWrapper}>
                    <ScrollView style={styles.messageScroll}>
                        <Text style={styles.messageText} >
                            {message}
                        </Text>
                    </ScrollView>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.buttonFrame} onPress={() => { handleMessage() }}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

// the render elements style
const styles = StyleSheet.create({

    modal: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        elevation: 5,
        alignSelf: 'center',
        alignItems: 'center',
        padding: Normalize(10),
        backgroundColor: 'white',
        justifyContent: 'center',
        maxWidth: Normalize(150),
        maxHeight: Normalize(150),
        borderRadius: Normalize(25),
        top: (AppStyle.windowSize.height - (AppStyle.windowSize.height / 2)) - (Normalize(150) / 2),
    },
    titleWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: NormalizeFont(22),
        color: AppStyle.sub_main_color,
    },
    messageWrapper: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageScroll: {
        alignSelf: 'center'
    },
    messageText: {
        textAlign: 'center',
        fontSize: NormalizeFont(14),
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonFrame: {
        alignItems: 'center',
        width: Normalize(125),
        height: Normalize(30),
        justifyContent: 'center',
        borderRadius: Normalize(20),
        backgroundColor: AppStyle.sub_main_color,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: NormalizeFont(14),
    }
});
