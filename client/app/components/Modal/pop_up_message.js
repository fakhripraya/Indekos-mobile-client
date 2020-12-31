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
import { animated, useTransition } from 'react-spring';

// spring animated view element
const AnimatedView = animated(View)

// PopUpMessage is a pop up that shows the generic message to be understandable by the user
export function PopUpMessage() {

    // Function Hooks
    const dispatch = useDispatch();
    const show = useSelector(state => state.popUpModalReducer.show);
    const title = useSelector(state => state.popUpModalReducer.title);
    const message = useSelector(state => state.popUpModalReducer.message);
    const transitions = useTransition(null, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 3000 }
    })

    // Functions
    function handleMessage() {
        dispatch(popUpModalChange({ show: false, title: '', message: '' }))
    }

    // Renders the pop up message component
    return transitions.map(({ key, props }) =>
        <AnimatedView key={key} style={[props, styles.container]}>
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
        </AnimatedView>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    modal: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        elevation: 5,
        alignItems: 'center',
        borderRadius: 50 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        maxWidth: (AppStyle.screenSize.width * 0.5),
        maxHeight: (AppStyle.screenSize.height * 0.25),
        left: (AppStyle.screenSize.width * 0.25),
        top: (AppStyle.screenSize.height - (AppStyle.screenSize.height / 2)) - (AppStyle.screenSize.height * 0.15),
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: AppStyle.sub_main_color
    },
    messageWrapper: {
        width: '90%',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageScroll: {
        alignSelf: 'center'
    },
    messageText: {
        textAlign: 'center',
        fontSize: 14
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    buttonFrame: {
        height: '50%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppStyle.sub_main_color,
        borderRadius: 20
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
});
