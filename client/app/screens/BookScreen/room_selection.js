import {
    View,
    Text,
    LogBox,
    FlatList,
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
                                <Text style={{ fontWeight: 'bold', color: txtColor, fontSize: Normalize(12) }}>{item.desc}</Text>
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
                <View style={styles.roomFloor}><Text style={{ fontWeight: 'bold', fontSize: Normalize(14) }}>{dataList[containerIndex].RoomLevel}</Text></View>
                <View style={styles.roomInfo}>
                    <View >
                        <Text style={{ fontSize: Normalize(12) }}>{dataList[containerIndex].RoomDesc}</Text>
                        <Text style={{ fontSize: Normalize(12) }}>{dataList[containerIndex].RoomSize}</Text>
                    </View>
                    <View style={{ position: 'absolute', flexDirection: 'row', left: '70%' }} >
                        <TouchableOpacity style={styles.arrow} onPress={() => { prevRoom() }}>
                            <AntDesign name="caretleft" size={Normalize(12)} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrow} onPress={() => { nextRoom() }}>
                            <AntDesign name="caretright" size={Normalize(12)} color="white" />
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
                    <Text style={{ color: 'white', fontSize: Normalize(14) }}>Full</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { updateDataList(index) }}>
                    <View style={[styles.roomList, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                        <Text style={{ color: txtColor, fontSize: Normalize(14) }}>{item.key}</Text>
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
            <View style={{ flex: 1, backgroundColor: 'white', width: AppStyle.windowSize.width, height: AppStyle.windowSize.height }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.pop() }} style={styles.headerIcon}>
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
                            <Text style={{ fontWeight: 'bold', fontSize: Normalize(12) }}>12</Text>
                        </View>
                        <View style={[styles.buttonDate, { width: AppStyle.screenSize.width * 0.40 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: Normalize(12) }}>October</Text>
                        </View>
                        <View style={[styles.buttonDate, { width: AppStyle.screenSize.width * 0.225 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: Normalize(12) }}>2012</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container_3}>
                    <TouchableOpacity onPress={() => { handleNext() }} style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.15,
    },
    headerText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: Normalize(18),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.screenSize.width * 0.05,
    },
    absoluteContainer: {
        elevation: 5,
        padding: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: Normalize(15),
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.4,
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    roomList: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Normalize(5),
        paddingTop: Normalize(15),
        marginTop: Normalize(3.5),
        marginBottom: Normalize(3.5),
        borderRadius: Normalize(10),
        paddingBottom: Normalize(15),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.1215,
        height: AppStyle.screenSize.width * 0.1225,
    },
    roomListContainer: {
        height: '75%',
        paddingTop: '7%',
        justifyContent: 'center',
    },
    arrow: {
        alignItems: 'center',
        backgroundColor: 'gray',
        justifyContent: 'center',
        marginRight: Normalize(10),
        borderRadius: Normalize(50),
        width: AppStyle.screenSize.width * 0.1,
        height: AppStyle.screenSize.width * 0.1,
    },
    roomInfo: {
        flexDirection: 'row',
        height: '12.5%',
    },
    roomFloor: {
        height: '12.5%',
    },
    container_1: {
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.15,
        paddingLeft: AppStyle.screenSize.width * 0.05,
    },
    container_2: {
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.15,
        paddingLeft: AppStyle.screenSize.width * 0.05,
    },
    container_3: {
        marginTop: Normalize(7.5),
        justifyContent: 'center',
        width: AppStyle.screenSize.width,
        paddingRight: AppStyle.screenSize.width * 0.05,
    },
    containerTitle: {
        marginTop: '2%',
        fontWeight: 'bold',
        marginBottom: '2%',
        alignSelf: 'flex-start',
        fontSize: Normalize(14),
    },
    nextBtn: {
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: Normalize(10),
        borderRadius: Normalize(50),
        paddingBottom: Normalize(10),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.275,
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
        paddingBottom: Normalize(10),
    },
    buttonPeriod: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Normalize(15),
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
        paddingBottom: Normalize(15),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.screenSize.width * 0.205,
    },
    buttonDate: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Normalize(15),
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
        paddingBottom: Normalize(15),
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
})
