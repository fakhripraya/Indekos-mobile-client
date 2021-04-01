import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { popUpModalChange, } from '../../redux';
import React, { useEffect, useState } from 'react';
import { groupBy } from '../../functions/group_by';
import { AppStyle, KostService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { View, Text, LogBox, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function RoomSelection({ route, navigation }) {

    // Hooks
    const dispatch = useDispatch()

    // get navigation parameter
    const room = route.params.room;
    const roomDetails = route.params.roomDetails;

    // Function states
    const [dataList, setDataList] = useState(null)
    const [containerIndex, setContainerIndex] = useState(0)
    const [periodDataList, setPeriodDataList] = useState(null)

    // map room array from database
    function KostPeriod() {

        // Renders the elements of the period carousel
        function _renderFirstCarousel({ item, index }) {

            const txtColor = item.state ? "white" : AppStyle.fourt_main_color;
            const bgColor = item.state ? AppStyle.fourt_main_color : "white";

            return (
                <TouchableOpacity onPress={() => { updatePeriodList(index) }}>
                    <View style={[styles.buttonPeriod, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                        <Text style={{ fontWeight: 'bold', color: txtColor, fontSize: NormalizeFont(12) }}>{item.desc}</Text>
                    </View>
                </TouchableOpacity>

            )
        }

        // update the state of the period
        const updatePeriodList = (index) => {

            const newArr = [...periodDataList];

            if (periodDataList[index].state === false) {
                newArr.forEach(element => {
                    element.state = false
                });

                newArr[index].state = true;
            }
            else
                newArr[index].state = false;

            setPeriodDataList(newArr);
        }

        return (
            <View style={styles.container_1}>
                <Text style={styles.containerTitle}>Period</Text>
                <View style={styles.buttonWrapper}>
                    <FlatList
                        data={periodDataList}
                        renderItem={_renderFirstCarousel}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )

    }

    // map room array from database
    function RoomListView() {

        // Renders the elements of the room detail flat list
        function _renderFlatList({ item, index }) {

            const txtColor = item.state ? "white" : AppStyle.fourt_main_color
            const bgColor = item.state ? AppStyle.fourt_main_color : "white"

            if (item.occupied === true) {
                return (
                    <View style={[styles.roomList, { backgroundColor: 'gray' }]}>
                        <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>Full</Text>
                    </View>
                )
            } else {
                return (
                    <TouchableOpacity onPress={() => { updateDataList(index) }}>
                        <View style={[styles.roomList, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                            <Text style={{ color: txtColor, fontSize: NormalizeFont(14) }}>{item.key}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }

        // update the state of the room detail
        const updateDataList = (index) => {

            const newArr = [...dataList];

            if (dataList[containerIndex].RoomDetailList[index].state === false) {
                newArr.forEach(element => {
                    element.RoomDetailList.forEach(element => {
                        element.state = false
                    });
                });

                newArr[containerIndex].RoomDetailList[index].state = true;
            }
            else
                newArr[containerIndex].RoomDetailList[index].state = false;

            setDataList(newArr);
        }

        return (
            <View style={styles.absoluteContainer}>
                <View style={styles.roomFloor}><Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>{dataList[containerIndex].RoomLevel}</Text></View>
                <View style={styles.roomInfo}>
                    <View >
                        <Text style={{ fontSize: NormalizeFont(12) }}>{dataList[containerIndex].RoomDesc}</Text>
                        <Text style={{ fontSize: NormalizeFont(12) }}>{dataList[containerIndex].RoomSize}</Text>
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

    function handleNext() {

        let selectedRoom = {};
        let selectedPeriod = {};

        dataList.forEach(element => {
            element.RoomDetailList.forEach(element => {
                if (element.state === true) {
                    selectedRoom = element
                }
            });
        });

        periodDataList.forEach(element => {
            if (element.state === true) {
                selectedPeriod = element
            }
        });

        if ((typeof (selectedRoom) !== 'undefined' && typeof (selectedPeriod) !== 'undefined') && (selectedRoom !== null && selectedPeriod !== null)) {
            if ((Object.keys(selectedRoom).length === 0 && selectedRoom.constructor === Object) && (Object.keys(selectedPeriod).length === 0 && selectedPeriod.constructor === Object)) {
                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: 'Silahkan pilih ruangan dan periode kost' }));
                return;
            }
            if (Object.keys(selectedRoom).length === 0 && selectedRoom.constructor === Object) {
                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: 'Silahkan pilih ruangan kost' }));
                return;
            }
            if ((Object.keys(selectedPeriod).length === 0 && selectedPeriod.constructor === Object)) {
                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: 'Silahkan pilih periode kost' }));
                return;
            }
        } else {
            // dispatch the popUpModalChange actions to store the generic message modal state
            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: 'Silahkan pilih ruangan dan periode kost' }));
            return;
        }

        navigation.push('MemberDetails', {
            room: room,
            selectedRoom: selectedRoom,
            selectedPeriod: selectedPeriod,
            roomDetails: roomDetails,
        });
    }

    // fetch the data from the server
    useEffect(() => {

        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        if (dataList === null) {

            let finalRooms = [];
            const groupedRooms = groupBy('floor_level', roomDetails.room_details);
            var groupedRoomsLevel = Object.keys(groupedRooms);

            for (var i in groupedRooms) {

                let rooms = [];

                for (var j in groupedRooms[i]) {
                    if (roomDetails.room_booked === null) {
                        let newRoom = {
                            id: groupedRooms[i][j].id,
                            state: false,
                            occupied: false, //TODO: masih placeholder nanti diganti
                            key: groupedRooms[i][j].room_number.toUpperCase(),
                        }
                        rooms = rooms.concat(newRoom)
                    }
                }

                let newFinalRoom = {
                    state: false,
                    RoomID: room.id,
                    RoomLevel: 'Level ' + groupedRoomsLevel[i - 1],
                    RoomDesc: room.room_desc,
                    RoomSize: room.room_length + room.room_area_uom_desc.substring(0, 1) + ' x ' + room.room_width + room.room_area_uom_desc.substring(0, 1),
                    RoomDetailList: rooms
                }

                finalRooms = finalRooms.concat(newFinalRoom)

            }

            setDataList(finalRooms)
        }

        if (periodDataList === null) {

            // creates the cancel token source
            var cancelSource = axios.CancelToken.source()

            // Get the data via axios get request
            kostAPI.get('/' + room.kost_id + '/period', {
                cancelToken: cancelSource.token,
                timeout: 10000
            })
                .then(response => {
                    if (response.data !== null) {
                        let finalPeriods = [];
                        response.data.forEach(element => {

                            let newFinalPeriod = {
                                state: false,
                                id: element.period_id,
                                desc: element.period_desc,
                            }

                            finalPeriods = [...finalPeriods, newFinalPeriod]
                        });

                        setPeriodDataList(finalPeriods);
                    }
                })
                .catch(error => {
                    if (typeof (error.response) !== 'undefined') {
                        if (!axios.isCancel(error)) {
                            // dispatch the popUpModalChange actions to store the generic message modal state
                            dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                        }
                    }
                });
        }

    }, [])

    //if null dont render yet
    if (dataList === null || periodDataList === null) {
        return null
    } else {
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
                <KostPeriod />
                <View style={styles.container_2}>
                    <Text style={styles.containerTitle}>Date</Text>
                    <View style={styles.buttonWrapper}>
                        <View style={[styles.buttonDate, { width: AppStyle.windowSize.width * 0.225 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>12</Text>
                        </View>
                        <View style={[styles.buttonDate, { width: AppStyle.windowSize.width * 0.40 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>October</Text>
                        </View>
                        <View style={[styles.buttonDate, { width: AppStyle.windowSize.width * 0.225 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>2012</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container_3}>
                    <TouchableOpacity onPress={() => { handleNext() }} style={[styles.nextBtn, { backgroundColor: AppStyle.sub_main_color }]}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
        fontSize: NormalizeFont(18),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.windowSize.width * 0.05,
    },
    absoluteContainer: {
        elevation: 5,
        padding: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.4,
        marginBottom: AppStyle.windowSize.height * 0.025,
    },
    roomList: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Normalize(5),
        paddingTop: Normalize(15),
        marginTop: Normalize(3.5),
        borderRadius: Normalize(10),
        marginBottom: Normalize(3.5),
        paddingBottom: Normalize(15),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.windowSize.width * 0.1215,
        height: AppStyle.windowSize.width * 0.1225,
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
        width: AppStyle.windowSize.width * 0.1,
        height: AppStyle.windowSize.width * 0.1,
    },
    roomInfo: {
        height: '12.5%',
        flexDirection: 'row',
    },
    roomFloor: {
        height: '12.5%',
    },
    container_1: {
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.15,
        paddingLeft: AppStyle.windowSize.width * 0.05,
    },
    container_2: {
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.15,
        paddingLeft: AppStyle.windowSize.width * 0.05,
    },
    container_3: {
        marginTop: Normalize(15),
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
        paddingRight: AppStyle.windowSize.width * 0.05,
    },
    containerTitle: {
        marginTop: '2%',
        fontWeight: 'bold',
        marginBottom: '2%',
        alignSelf: 'flex-start',
        fontSize: NormalizeFont(14),
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
        width: AppStyle.windowSize.width * 0.275,
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
        width: AppStyle.windowSize.width * 0.205,
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
