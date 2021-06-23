import axios from 'axios';
import React from 'react';
import { AppStyle, KostService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { useAxiosGetArrayParams } from '../../promise/axios_get_array';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CurrencyFormat, CurrencyPrefix } from '../../functions/currency';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { RoomDetailStatusString, RoomDetailStatusColor } from '../../functions/status';
import { MyKosanDetailBackground } from '../../components/Backgrounds/my_kosan_background';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { GetZero } from '../../functions/string';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function MyKosanDetail({ route, navigation }) {

    // get navigation parameter
    const kost = route.params.kost;

    // Global Variable
    const requestConfig = {
        timeout: 10000
    }
    let RoomList = {};
    let page = 1;

    function MyKosanRoomList() {
        // Get the kost data from the server
        // 1 page of kost list is 10 kost 
        const { dataArray, status } = useAxiosGetArrayParams(kostAPI, kost.id + '/rooms/' + 'all/' + page + '/details', requestConfig);
        RoomList = dataArray;

        function RoomBody(props) {
            if (props.kostRoomDetail.booker !== null) {
                return (
                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>
                        <View style={{ marginLeft: Normalize(10), height: '50%', width: '100%', justifyContent: 'center' }}>
                            <View style={{ height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={{ height: '100%', width: '50%', flexDirection: 'row' }}>
                                    <View style={styles.ownerUserPict}>
                                        <ImageBackground
                                            imageStyle={{ borderRadius: Normalize(10.12) }}
                                            style={styles.backgroundImg}
                                            source={{ uri: props.kostRoomDetail.booker.profile_picture }}
                                        />
                                    </View>
                                    <View style={{ height: Normalize(40), alignSelf: 'center', marginLeft: Normalize(5) }}>
                                        <View style={{ height: '100%', alignSelf: 'center', justifyContent: 'flex-start' }}>
                                            <Text style={{ fontSize: NormalizeFont(12) }}>{props.kostRoomDetail.booker.displayname.length > 10 ? props.kostRoomDetail.booker.displayname.substring(0, 10).replace(/\s*$/, "") + '...' : props.kostRoomDetail.booker.displayname}</Text>
                                            <Text style={{ fontSize: NormalizeFont(12) }}>{'#' + GetZero(props.kostRoomDetail.booker.id)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>{CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price).length > 15 ? CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginLeft: Normalize(10), height: '50%', width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ height: '100%', width: '33%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(11), fontWeight: 'bold' }}>Prev Payment</Text>
                                <Text style={{ fontSize: NormalizeFont(11) }}>{props.kostRoomDetail.prev_payment.substr(0, props.kostRoomDetail.prev_payment.indexOf('T'))}</Text>
                            </View>
                            <View style={{ height: '100%', width: '33%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(11), fontWeight: 'bold' }}>next Payment</Text>
                                <Text style={{ fontSize: NormalizeFont(11) }}>{props.kostRoomDetail.next_payment.substr(0, props.kostRoomDetail.next_payment.indexOf('T'))}</Text>
                            </View>
                            <View style={{ height: '100%', width: '33%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(11), fontWeight: 'bold' }}>Status</Text>
                                <Text style={{ fontSize: NormalizeFont(11), color: RoomDetailStatusColor(props.kostRoomDetail.status) }}>{RoomDetailStatusString(props.kostRoomDetail.status)}</Text>
                            </View>
                        </View>
                    </View >
                )
            } else {
                return (
                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                        <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: Normalize(10), fontWeight: 'bold', fontSize: NormalizeFont(12) }}>Empty</Text>
                        </View>
                        <View style={{ height: '100%', width: '50%', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>{CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price).length > 15 ? CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(props.kostRoomDetail.currency), props.kostRoomDetail.price)}</Text>
                        </View>
                    </View>
                )
            }
        }

        function _renderSearchList({ item }) {
            return (
                <>
                    <TouchableNativeFeedbackPrevent onPress={() => {
                    }} >
                        <View style={styles.roomContainer} >
                            <View style={styles.roomHeader}>
                                <View style={{ flexDirection: 'column', height: '70%', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(24) }}>{item.room_number.toUpperCase()}</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(12) }}>{item.room_desc.length > 10 ? item.room_desc.substring(0, 10).replace(/\s*$/, "") + '...' : item.room_desc}</Text>
                                </View>
                                <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center', backgroundColor: AppStyle.main_color, borderBottomLeftRadius: Normalize(15), borderBottomRightRadius: Normalize(15) }}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(12) }}>Lantai {item.floor_level}</Text>
                                </View>
                            </View>
                            <View style={styles.roomBodyContainer}>
                                <RoomBody kostRoomDetail={item} />
                            </View>
                        </View >
                    </TouchableNativeFeedbackPrevent>
                    <View style={styles.sortButtonWrapperContaner}>
                        <View style={styles.sortButtonWrapper}>
                            <View style={[styles.sortButton, { borderRightWidth: 1, flexDirection: 'row' }]}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                    <AntDesign name="edit" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.sortButton, { flexDirection: 'row' }]}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                    <Ionicons name="megaphone-outline" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Remind</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.sortButton, { borderLeftWidth: 1, flexDirection: 'row' }]}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                                    <MaterialIcons name="delete-outline" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>
            )
        }

        if (RoomList === null) {
            if (status === 200) {
                return (
                    <>
                        <View style={styles.pickerWrapper}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerTextContainer}>
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14), marginLeft: Normalize(10) }}>All</Text>
                                </View>
                                <View style={styles.pickerArrowContainer}>
                                    <AntDesign name="caretdown" size={Normalize(18)} color="white" />
                                </View>
                            </View>
                            <View style={styles.roomCounterWrapper}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14) }}>Your Room: {RoomList.kost_room_detail_sum}</Text>
                                <View style={styles.addRoomButton}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(14) }}>Add Room</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tabNullContainer}>
                            <Text>No Room found</Text>
                        </View>
                    </>
                )
            } else if (status === null) {
                return (
                    <View style={styles.tabNullContainer}>
                        <ActivityIndicator size="large" color={AppStyle.main_color} />
                    </View>
                )
            }
            else if (status !== 200) {
                return (
                    <View style={styles.tabNullContainer}>
                        <Text>Retry Pls</Text>
                    </View>
                )
            }
        } else {

            async function handleScroll() {
                page++;
                await kostAPI.get(kost.id + '/rooms/' + 'all/' + page + '/details', requestConfig)
                    .then(response => {
                        response.data.kost_room_detail.forEach(function (item, index) {
                            RoomList.kost_room_detail.push(item)
                        });
                    })
                    .catch(error => {
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                if (error.response.status !== 200) {
                                    // dispatch the popUpModalChange actions to store the generic message modal state
                                    dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                                }
                            }
                        }
                    })
            }

            if (RoomList.kost_room_detail_sum === 0) {
                return (
                    <>
                        <View style={styles.pickerWrapper}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerTextContainer}>
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14), marginLeft: Normalize(10) }}>All</Text>
                                </View>
                                <View style={styles.pickerArrowContainer}>
                                    <AntDesign name="caretdown" size={Normalize(18)} color="white" />
                                </View>
                            </View>
                            <View style={styles.roomCounterWrapper}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14) }}>Your Room: {RoomList.kost_room_detail_sum}</Text>
                                <View style={styles.addRoomButton}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(14) }}>Add Room</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tabNullContainer}>
                            <Text>No Room found</Text>
                        </View>
                    </>
                )
            } else {
                return (
                    <>
                        <View style={styles.pickerWrapper}>
                            <View style={styles.pickerContainer}>
                                <View style={styles.pickerTextContainer}>
                                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14), marginLeft: Normalize(10) }}>All</Text>
                                </View>
                                <View style={styles.pickerArrowContainer}>
                                    <AntDesign name="caretdown" size={Normalize(18)} color="white" />
                                </View>
                            </View>
                            <View style={styles.roomCounterWrapper}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(14) }}>Your Room: {RoomList.kost_room_detail_sum}</Text>
                                <View style={styles.addRoomButton}>
                                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(14) }}>Add Room</Text>
                                </View>
                            </View>
                        </View>
                        <FlatList
                            data={RoomList.kost_room_detail}
                            renderItem={_renderSearchList}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={1}
                            ListFooterComponent={() => {
                                if (RoomList.kost_room_detail.length === RoomList.kost_room_detail_sum) {
                                    return null
                                } else {
                                    return (
                                        <View style={{
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            height: Normalize(50),
                                            justifyContent: 'center',
                                            marginBottom: Normalize(15),
                                            width: AppStyle.windowSize.width * 0.9,
                                        }} >
                                            <ActivityIndicator size="large" color={AppStyle.main_color} />
                                        </View >
                                    )
                                }
                            }}
                            onEndReached={() => {
                                handleScroll();
                            }}
                            onEndReachedThreshold={1}
                        />
                    </>
                )
            }
        }
    }

    return (
        <MyKosanDetailBackground>
            <View style={styles.header}>
                <TouchableOpacityPrevent onPress={() => {
                    navigation.pop()
                }} style={styles.headerIcon}>
                    <AntDesign name="left" size={Normalize(24)} color="white" />
                </TouchableOpacityPrevent>
                <View>
                    <Text style={styles.headerText}>{kost.kost_name}</Text>
                </View>
            </View>
            <View style={styles.headerLocation}>
                <Text style={{ color: 'white', fontSize: NormalizeFont(12) }} >{kost.city}</Text>
            </View>
            <View style={styles.topBorder} />
            <View style={styles.tabContainer}>
                <MyKosanRoomList />
            </View>
        </MyKosanDetailBackground>
    )
}

const styles = StyleSheet.create({

    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    ownerUserPict: {
        alignSelf: 'center',
        width: Normalize(40),
        height: Normalize(40),
        borderWidth: Normalize(4),
        borderRadius: Normalize(10.12),
        borderColor: AppStyle.fifth_main_color,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Normalize(60),
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: NormalizeFont(20),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.windowSize.width * 0.05,
    },
    headerLocation: {
        alignItems: 'center',
        marginTop: Normalize(10),
        justifyContent: 'center',
    },
    topBorder: {
        position: 'absolute',
        height: Normalize(15),
        borderTopLeftRadius: 25,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        width: AppStyle.windowSize.width,
        top: AppStyle.windowSize.height * 0.225 - Normalize(15),
    },
    pickerWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(100),
        marginTop: Normalize(10),
        justifyContent: 'space-between',
        width: AppStyle.windowSize.width * 0.9,
    },
    pickerContainer: {
        width: '60%',
        flexDirection: 'row',
        height: Normalize(45),
    },
    pickerTextContainer: {
        width: '80%',
        height: '100%',
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.4)',
        borderTopLeftRadius: Normalize(10),
        borderBottomLeftRadius: Normalize(10),
    },
    pickerArrowContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: Normalize(10),
        borderBottomRightRadius: Normalize(10),
        backgroundColor: AppStyle.fourt_main_color,
    },
    roomCounterWrapper: {
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    addRoomButton: {
        alignItems: 'center',
        width: Normalize(90),
        padding: Normalize(5),
        justifyContent: 'center',
        borderRadius: Normalize(10),
        backgroundColor: AppStyle.sub_main_color,
    },
    roomContainer: {
        flexDirection: 'row',
        height: Normalize(100),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    roomHeader: {
        width: '30%',
        height: '100%',
        flexDirection: 'column',
        borderRadius: Normalize(15),
        backgroundColor: AppStyle.fourt_main_color,
    },
    roomBodyContainer: {
        width: '70%',
        height: '100%',
    },
    tabNullContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
        height: (AppStyle.windowSize.height - ((AppStyle.windowSize.height * 0.2) + (Normalize(60) / 2) - Normalize(60) - Normalize(60) + (AppStyle.windowSize.width * 0.175) + (AppStyle.windowSize.width * 0.15 / 2)))
    },
    tabContainer: {
        alignItems: 'center',
        width: AppStyle.windowSize.width,
        height: (AppStyle.windowSize.height - ((AppStyle.windowSize.height * 0.2))),
    },
    sortButtonWrapperContaner: {
        width: '100%',
        alignItems: 'center',
        height: Normalize(60),
        backgroundColor: 'white',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },
    sortButtonWrapper: {
        width: '90%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: Normalize(42),
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    sortButton: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.windowSize.width * 0.9 / 3,
    },
})
