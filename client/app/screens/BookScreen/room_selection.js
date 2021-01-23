import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { AppStyle } from '../../config/app.config';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native'

export default function RoomSelection() {

    // Function refs
    const carouselRef = useRef(null);
    // Function states
    const [activeIndex, setActive] = useState(0)
    const initialDataList = [
        {
            state: false,
            occupied: false,
            key: "1",
        },
        {
            state: false,
            occupied: true,
            key: "2",
        },
        {
            state: false,
            occupied: false,
            key: "3",
        },
        {
            state: false,
            occupied: true,
            key: "4",
        },
        {
            state: false,
            occupied: true,
            key: "5",
        },
        {
            state: false,
            occupied: false,
            key: "6",
        },
        {
            state: false,
            occupied: true,
            key: "7",
        },
        {
            state: false,
            occupied: true,
            key: "8",
        },
        {
            state: false,
            occupied: true,
            key: "9",
        },
        {
            state: false,
            occupied: true,
            key: "10",
        },
        {
            state: false,
            occupied: true,
            key: "11",
        },
        {
            state: false,
            occupied: true,
            key: "12",
        },
        {
            state: false,
            occupied: true,
            key: "13",
        },
        {
            state: false,
            occupied: true,
            key: "14",
        },
        {
            state: false,
            occupied: true,
            key: "15",
        },
        {
            state: false,
            occupied: true,
            key: "16",
        },
        {
            state: false,
            occupied: true,
            key: "17",
        },
        {
            state: false,
            occupied: true,
            key: "18",
        },
    ]
    const [dataList, setDataList] = useState([
        {
            state: false,
            occupied: false,
            key: "1",
        },
        {
            state: false,
            occupied: true,
            key: "2",
        },
        {
            state: false,
            occupied: false,
            key: "3",
        },
        {
            state: false,
            occupied: true,
            key: "4",
        },
        {
            state: false,
            occupied: true,
            key: "5",
        },
        {
            state: false,
            occupied: false,
            key: "6",
        },
        {
            state: false,
            occupied: true,
            key: "7",
        },
        {
            state: false,
            occupied: true,
            key: "8",
        },
        {
            state: false,
            occupied: true,
            key: "9",
        },
        {
            state: false,
            occupied: true,
            key: "10",
        },
        {
            state: false,
            occupied: true,
            key: "11",
        },
        {
            state: false,
            occupied: true,
            key: "12",
        },
        {
            state: false,
            occupied: true,
            key: "13",
        },
        {
            state: false,
            occupied: true,
            key: "14",
        },
        {
            state: false,
            occupied: true,
            key: "15",
        },
        {
            state: false,
            occupied: true,
            key: "16",
        },
        {
            state: false,
            occupied: true,
            key: "17",
        },
        {
            state: false,
            occupied: true,
            key: "18",
        },
    ])

    // the fixed data for the carousel view
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

    // Renders the elements of the carousel view
    function _renderItem({ page }) {
        return (
            <View style={styles.buttonWrapper}>
                <View style={styles.buttonPeriod}>
                    <Text style={{ fontWeight: 'bold' }}>Daily</Text>
                </View>
                <View style={styles.buttonPeriod}>
                    <Text style={{ fontWeight: 'bold' }}>Weekly</Text>
                </View>
                <View style={styles.buttonPeriod}>
                    <Text style={{ fontWeight: 'bold' }}>Monthly</Text>
                </View>
                <View style={styles.buttonPeriod}>
                    <Text style={{ fontWeight: 'bold' }}>Annualy</Text>
                </View>
            </View>
        )
    }

    // Renders the elements of the carousel view
    function _renderFlatList({ item, index }) {

        const txtColor = item.state ? "white" : AppStyle.fourt_main_color
        const bgColor = item.state ? AppStyle.fourt_main_color : "white"

        const updateDataList = (index) => {

            let newArr = [...initialDataList]; // copying the old datas array
            if (newArr[index].state === false)
                newArr[index].state = true; // replace e.target.value with whatever you want to change it to
            else
                newArr[index].state = false; // replace e.target.value with whatever you want to change it to

            setDataList(newArr); // ??
        }

        if (item.occupied === true) {
            return (
                <View style={[styles.roomList, { backgroundColor: 'gray' }]}>
                    <Text style={{ color: 'white' }}>Full</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { updateDataList(index) }}>
                    <View style={[styles.roomList, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                        <Text style={{ color: txtColor }}>{item.key}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: '100%', height: AppStyle.screenSize.height }}>
                    <Text style={styles.title}>Room Selection</Text>
                    <View style={styles.absoluteContainer}>
                        <View style={styles.roomFloor}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>Room Level</Text></View>
                        <View style={styles.roomInfo}>
                            <View >
                                <Text>Luxury Room</Text>
                                <Text>( 20m x 20m )</Text>
                            </View>
                            <View style={{ position: 'absolute', flexDirection: 'row', left: '70%' }} >
                                <TouchableOpacity style={styles.arrow}>
                                    <AntDesign name="caretleft" size={12} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.arrow}>
                                    <AntDesign name="caretright" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.roomListContainer}>
                            <FlatList
                                data={dataList}
                                renderItem={_renderFlatList}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={6}
                            />
                        </View>
                    </View>
                    <View style={styles.container_1}>
                        <Text style={styles.containerTitle}>Period</Text>
                        <Carousel
                            ref={carouselRef}
                            layout={"default"}
                            data={caraouselData}
                            sliderWidth={AppStyle.screenSize.width}
                            itemWidth={AppStyle.screenSize.width}
                            renderItem={_renderItem}
                            onSnapToItem={(index) => { setActive(index) }}
                        />
                    </View>
                    <View style={styles.container_2}>
                        <Text style={styles.containerTitle}>Date</Text>
                        <View style={styles.buttonWrapper}>
                            <View style={[styles.buttonDate, { width: AppStyle.screenSize.width * 0.225 }]}>
                                <Text style={{ fontWeight: 'bold' }}>12</Text>
                            </View>
                            <View style={[styles.buttonDate, { width: AppStyle.screenSize.width * 0.40 }]}>
                                <Text style={{ fontWeight: 'bold' }}>October</Text>
                            </View>
                            <View style={[styles.buttonDate, { width: AppStyle.screenSize.width * 0.225 }]}>
                                <Text style={{ fontWeight: 'bold' }}>2012</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container_3}>
                        <TouchableOpacity style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 / Dimensions.get("screen").fontScale }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    title: {
        marginTop: AppStyle.screenSize.height * 0.05,
        marginBottom: AppStyle.screenSize.height * 0.05,
        alignSelf: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20 / Dimensions.get("screen").fontScale,
    },
    absoluteContainer: {
        marginBottom: AppStyle.screenSize.height * 0.025,
        elevation: 5,
        borderRadius: 15,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.425,
    },
    roomList: {
        width: AppStyle.screenSize.width * 0.1215,
        height: AppStyle.screenSize.width * 0.1225,
        marginTop: 1,
        marginRight: 5,
        marginBottom: 1,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    roomListContainer: {
        top: AppStyle.screenSize.height * 0.05
    },
    arrow: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderRadius: 100 / 2,
        marginRight: 10,
        alignItems: 'center',
        width: AppStyle.screenSize.width * 0.1,
        height: AppStyle.screenSize.height * 0.05,
    },
    roomInfo: {
        flexDirection: 'row',
    },
    container_1: {
        paddingLeft: AppStyle.screenSize.width * 0.05,
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.15,
        width: AppStyle.screenSize.width
    },
    container_2: {
        paddingLeft: AppStyle.screenSize.width * 0.05,
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.15,
        width: AppStyle.screenSize.width
    },
    container_3: {
        paddingRight: AppStyle.screenSize.width * 0.05,
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.1,
        width: AppStyle.screenSize.width
    },
    containerTitle: {
        alignSelf: 'flex-start',
        marginBottom: '2%',
        marginTop: '2%',
        fontWeight: 'bold',
        fontSize: 16 / Dimensions.get("screen").fontScale
    },
    nextBtn: {
        width: AppStyle.screenSize.width * 0.275,
        borderRadius: 100 / 2,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    buttonPeriod: {
        width: AppStyle.screenSize.width * 0.205,
        marginRight: 10,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    buttonDate: {
        marginRight: 10,
        borderRadius: 10,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
})
