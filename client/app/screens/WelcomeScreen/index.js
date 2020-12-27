import React, { useState, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { AppStyle } from '../../config/app.config';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default function Welcome({ navigation }) {

    // Function refs
    const carouselRef = useRef(null);
    // Function states
    const [activeIndex, setActive] = useState(0)

    let caraouselData = [
        {
            title: "Find your",
            sub_title: "kos",
            text: "Have an account?",
        },
        {
            title: "Choose",
            sub_title: "it",
            text: "Have an account?",
        },
        {
            title: "Manage",
            sub_title: "all",
            second_title: "time",
            second_sub_title: "in one",
            text: "Have an account?",
        },
    ]

    function _renderItem({ item, index }) {
        return (
            <View style={styles.textWrapper}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '15%' }}>
                    <View style={activeIndex == 0 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 1 ? styles.dotStyleFlag : styles.dotStyle} />
                    <View style={activeIndex == 2 ? styles.dotStyleFlag : styles.dotStyle} />
                </View>
                <View>
                    <Text style={{ fontSize: 30, color: 'white' }}>{item.title}
                        <Text style={{ color: AppStyle.third_main_color }}> {item.sub_title}</Text>
                    </Text>
                    <Text style={[
                        { fontSize: 30, color: AppStyle.third_main_color },
                        activeIndex == 2 ? { display: 'flex' } : { display: 'none' }
                    ]}>{item.second_sub_title}
                        <Text style={{ color: 'white' }}> {item.second_title}</Text>
                    </Text>
                </View>
                <Text style={{ color: 'white' }}>{item.text}</Text>
            </View >
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Carousel
                    ref={carouselRef}
                    layout={"default"}
                    data={caraouselData}
                    sliderWidth={AppStyle.screenSize.width}
                    itemWidth={AppStyle.screenSize.width}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => {
                        setActive(index);
                    }} />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={[{
                        width: AppStyle.screenSize.width / 3,
                    }, activeIndex == 0 ? { display: 'none' } : { display: 'flex' }]}>
                        <Text onPress={() => { carouselRef.current.snapToPrev(); }} style={[styles.button, { backgroundColor: AppStyle.fifth_main_color }]}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: AppStyle.screenSize.width / 3,
                    }}>
                        <Text onPress={() => {
                            if (activeIndex == 2)
                                navigation.navigate('Auth');
                            else
                                carouselRef.current.snapToNext();

                        }}
                            style={
                                [
                                    styles.button,
                                    { backgroundColor: AppStyle.sub_main_color }
                                ]
                            }>{activeIndex == 0 ? "Start" : "Next"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyle.main_color,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    wrapper: {
        flex: 0.6,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonWrapper: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        top: 30
    },
    dotStyle: {
        marginRight: 10,
        height: 10,
        width: 10,
        borderRadius: 1000,
        backgroundColor: 'white',
    },
    dotStyleFlag: {
        marginRight: 10,
        transform: [{ scaleX: 2 }],
        height: 10,
        width: 10,
        borderRadius: 1000,
        backgroundColor: AppStyle.sub_main_color,
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 50,
        borderColor: '#fff'
    }
});
