import {
    View,
    Text,
    LogBox,
    FlatList,
    ScrollView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { AppStyle, Normalize } from '../../config/app.config';
import React, { useEffect, useRef, useState } from 'react';

export default function RoomSelection({ navigation }) {

    // Function refs
    const periodCarouselRef = useRef(null);

    // Function states
    const [dataList, setDataList] = useState(null)
    const [periodDataList, setPeriodDataList] = useState(null)
    const [containerIndex, setContainerIndex] = useState(0)

    // data dummy 1
    const RoomListData = [
        {
            state: false,
            RoomID: 1,
            RoomLevel: "level 1",
            RoomDesc: "Kamar Mayat",
            RoomSize: "(20m x 20m)",
            RoomDetailList: [
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
            ]
        },
        {
            state: false,
            RoomID: 2,
            RoomLevel: "level 2",
            RoomDesc: "Luxury Room",
            RoomSize: "(20m x 20m)",
            RoomDetailList: [
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
            ]
        },
        {
            state: false,
            RoomID: 3,
            RoomLevel: "level 3",
            RoomDesc: "Kamar Mandi",
            RoomSize: "(5m x 5m)",
            RoomDetailList: [
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
                    occupied: false,
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
                    occupied: false,
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
                    occupied: false,
                    key: "15",
                },
                {
                    state: false,
                    occupied: true,
                    key: "16",
                },
            ]
        },
    ]

    // data dummy 2
    const PeriodDataList = [
        [
            {
                desc: "Daily",
                state: false,
            },
            {
                desc: "Weekly",
                state: false,
            },
            {
                desc: "Monthly",
                state: false,
            },
            {
                desc: "Annualy",
                state: false,
            }
        ],
        [
            {
                desc: "Decadely",
                state: false,
            },
            {
                desc: "Secondly",
                state: false,
            },
            {
                desc: "Minutely",
                state: false,
            },
            {
                desc: "Hourly",
                state: false,
            }
        ],
    ]

    function nextRoom() {
        if (containerIndex + 1 >= dataList.length)
            return

        setContainerIndex(containerIndex + 1)
    }

    function prevRoom() {
        if (containerIndex - 1 < 0)
            return

        setContainerIndex(containerIndex - 1)
    }

    // Renders the elements of the period carousel
    function _renderFirstCarousel({ item, index }) {

        let parent = index

        return (
            <View style={styles.buttonWrapper}>
                {item.map((item, index) => {

                    const txtColor = item.state ? "white" : AppStyle.fourt_main_color
                    const bgColor = item.state ? AppStyle.fourt_main_color : "white"

                    return (
                        <TouchableOpacity key={index} onPress={() => { updatePeriodList(index, parent) }}>
                            <View style={[styles.buttonPeriod, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                                <Text style={{ fontWeight: 'bold', color: txtColor }}>{item.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                })}
            </View>
        )
    }

    // update the state of the period
    const updatePeriodList = (index, parent) => {

        const newArr = [...PeriodDataList];

        if (periodDataList[parent][index].state === false)
            newArr[parent][index].state = true;
        else
            newArr[parent][index].state = false;

        setPeriodDataList(newArr);
    }

    // map room array from database
    function RoomListView() {

        return (
            <View style={styles.absoluteContainer}>
                <View style={styles.roomFloor}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>{dataList[containerIndex].RoomLevel}</Text></View>
                <View style={styles.roomInfo}>
                    <View >
                        <Text>{dataList[containerIndex].RoomDesc}</Text>
                        <Text>{dataList[containerIndex].RoomSize}</Text>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', left: '70%' }} >
                        <TouchableOpacity style={styles.arrow} onPress={() => { prevRoom() }}>
                            <AntDesign name="caretleft" size={12} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrow} onPress={() => { nextRoom() }}>
                            <AntDesign name="caretright" size={12} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.roomListContainer}>
                    <FlatList
                        data={dataList[containerIndex].RoomDetailList}
                        renderItem={_renderFlatList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={6}
                    />
                </View>
            </View>
        )

    }

    // Renders the elements of the room detail flat list
    function _renderFlatList({ item, index }) {

        const txtColor = item.state ? "white" : AppStyle.fourt_main_color
        const bgColor = item.state ? AppStyle.fourt_main_color : "white"

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

    // update the state of the room detail
    const updateDataList = (index) => {

        const newArr = [...RoomListData];

        if (dataList[containerIndex].RoomDetailList[index].state === false)
            newArr[containerIndex].RoomDetailList[index].state = true;
        else
            newArr[containerIndex].RoomDetailList[index].state = false;

        setDataList(newArr);
    }

    function handleNext() {
        navigation.push('MemberDetails');
    }

    // fetch the data from the server
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (dataList === null)
            setDataList(RoomListData)

        if (periodDataList === null)
            setPeriodDataList(PeriodDataList)

        return () => {
        }
    }, [])

    //if null dont render yet
    if (dataList !== null) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', width: '100%', height: '100%' }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.replace('KostDetail') }} style={styles.headerIcon}>
                            <AntDesign name="left" size={Normalize(24)} color="black" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerText}>Room Selection</Text>
                        </View>
                    </View>
                    <RoomListView />
                    <View style={styles.container_1}>
                        <Text style={styles.containerTitle}>Period</Text>
                        <Carousel
                            ref={periodCarouselRef}
                            layout={"default"}
                            data={periodDataList}
                            sliderWidth={AppStyle.screenSize.width}
                            itemWidth={AppStyle.screenSize.width}
                            renderItem={_renderFirstCarousel}
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
                        <TouchableOpacity onPress={() => { handleNext() }} style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    headerIcon: {
        left: 16,
        position: 'absolute',
    },
    absoluteContainer: {
        elevation: 5,
        paddingTop: '5%',
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.425,
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    roomList: {
        marginTop: 1,
        marginRight: 5,
        borderWidth: 1,
        paddingTop: 15,
        marginBottom: 1,
        borderRadius: 10,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.1215,
        height: AppStyle.screenSize.width * 0.1225,
    },
    roomListContainer: {
        top: AppStyle.screenSize.height * 0.05
    },
    arrow: {
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 100 / 2,
        backgroundColor: 'gray',
        justifyContent: 'center',
        width: AppStyle.screenSize.width * 0.1,
        height: AppStyle.screenSize.height * 0.05,
    },
    roomInfo: {
        flexDirection: 'row',
    },
    container_1: {
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.15,
        paddingLeft: AppStyle.screenSize.width * 0.05,
    },
    container_2: {
        paddingLeft: AppStyle.screenSize.width * 0.05,
        justifyContent: 'center',
        height: AppStyle.screenSize.height * 0.15,
        width: AppStyle.screenSize.width
    },
    container_3: {
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.15,
        paddingRight: AppStyle.screenSize.width * 0.05,
    },
    containerTitle: {
        marginTop: '2%',
        fontWeight: 'bold',
        marginBottom: '2%',
        alignSelf: 'flex-start',
        fontSize: 16,
    },
    nextBtn: {
        paddingTop: 10,
        borderWidth: 1,
        paddingBottom: 10,
        alignItems: 'center',
        borderRadius: 100 / 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.275,
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonPeriod: {
        paddingTop: 15,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 10,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.205,
    },
    buttonDate: {
        paddingTop: 15,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 10,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
})
