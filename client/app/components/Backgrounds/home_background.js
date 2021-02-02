import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import React from 'react';
import { AppStyle } from '../../config/app.config';

// HomeBackground is the background image for the home stack
export default function HomeBackground(props) {

    // Renders the HomeStack background
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: AppStyle.screenSize.height }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.backgroundContainer} >
                        <View style={styles.background_1} />
                        <View style={styles.background_2} />
                        <View style={styles.background_3} />
                    </View>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto itaque esse expedita quos veniam quisquam, sunt exercitationem voluptas porro ipsa at dolorem obcaecati, ex nemo ipsam quasi rem enim doloremque.</Text>
                    {props.children}
                </ScrollView>
            </View>
        </View>
    )
}

// the render elements style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    backgroundContainer: {
        position: 'absolute',
        height: AppStyle.screenSize.height * 0.4,
        width: AppStyle.screenSize.width,
        backgroundColor: AppStyle.third_main_color,
    },
    background_3: {
        position: 'absolute',
        alignSelf: 'center',
        width: AppStyle.screenSize.width,
        top: (AppStyle.screenSize.height * 0.4),
        height: AppStyle.screenSize.height * 0.3,
        backgroundColor: 'white',
    },
    background_1: {
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 300 / 2,
        width: AppStyle.screenSize.width * 0.6,
        top: (AppStyle.screenSize.height * 0.2),
        height: AppStyle.screenSize.height * 0.3,
        right: (AppStyle.screenSize.width * 0.60),
        backgroundColor: AppStyle.fourt_main_color,
    },
    background_2: {
        position: 'absolute',
        borderRadius: 300 / 2,
        backgroundColor: AppStyle.main_color,
        width: AppStyle.screenSize.width * 0.5,
        left: (AppStyle.screenSize.width) * 0.7,
        height: AppStyle.screenSize.height * 0.5,
        bottom: (AppStyle.screenSize.height * 0.575),
        transform: [{ scaleX: 3 }, { scaleY: 3 }, { rotate: '5deg' }],
    },
})
