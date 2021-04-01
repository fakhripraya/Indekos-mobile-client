import axios from 'axios';
import React, { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { AppStyle, KostService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { MappedFacilities } from '../../components/Icons/facilities';
import { useAxiosGetArrayParams } from '../../promise/axios_get_array';
import { CurrencyPrefix, CurrencyFormat } from '../../functions/currency';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import MyKosanBackground from '../../components/Backgrounds/my_kosan_background';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, ImageBackground, ActivityIndicator, FlatList } from 'react-native';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function MyKosan() {

    // Function Hooks
    const [tabIndex, setTabIndex] = useState(0)
    const [requestConfig, setRequestConfig] = useState({
        cancelToken: axios.CancelToken.source().token,
        timeout: 10000
    })

    // Global Variable
    let KostList = [];
    let page = 1;

    function MyKosan() {
        // Get the kost data from the server
        // 1 page of kost list is 10 kost 
        const { dataArray, error } = useAxiosGetArrayParams(kostAPI, '/all/' + 0 + '/' + page, requestConfig);
        KostList = dataArray;

        function _renderSearchList({ item }) {

            return (
                <TouchableNativeFeedbackPrevent onPress={() => {
                }} >
                    <View style={styles.itemWrapper} >
                        <View style={styles.thumbnailContainer}>
                            <ImageBackground
                                imageStyle={{ borderRadius: Normalize(10) }}
                                style={styles.backgroundImg}
                                source={{ uri: item.kost.thumbnail_url }}
                            />
                        </View>
                        <View style={styles.itemContainer}>
                            <View style={styles.itemTitle}>
                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost.kost_name.length > 15 ? item.kost.kost_name.substring(0, 15).replace(/\s*$/, "") + '...' : item.kost.kost_name}</Text>
                            </View>
                            <View style={styles.itemLocation}>
                                <Entypo name="location" size={Normalize(14)} color="black" style={{ marginRight: Normalize(12.5) }} />
                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost.city.length > 15 ? item.kost.city.substring(0, 15).replace(/\s*$/, "") + '...' : item.kost.city}</Text>
                            </View>
                            <View style={styles.itemFacilitiesContainer}>
                                <View style={styles.itemFacilities}>
                                    <MappedFacilities facilities={item.facilities === null ? [] : item.facilities.slice(0, 2)} category={0} />
                                </View>
                                <View style={styles.itemFacilities}>
                                    <MappedFacilities facilities={item.facilities === null ? [] : item.facilities.slice(2, 4)} category={0} />
                                </View>
                            </View>
                            <View style={styles.itemPrice}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: NormalizeFont(16), fontWeight: 'bold' }}>{CurrencyFormat(CurrencyPrefix(item.currency), item.price).length > 15 ? CurrencyFormat(CurrencyPrefix(item.currency), item.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(item.currency), item.price)}</Text>
                                </View>
                                <Text style={{ fontSize: NormalizeFont(14), top: 5, color: 'gray' }}>/Month</Text>
                            </View>
                        </View>
                    </View >
                </TouchableNativeFeedbackPrevent>
            )
        }

        function handleScroll() {

            page++;

            trackPromise(
                kostAPI.get('/all/' + 0 + '/' + page, requestConfig)
                    .then(response => {
                        response.data.forEach(function (item, index) {
                            KostList.push(item)
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
            );

        }

        if (KostList === null) {
            return (
                <ActivityIndicator size="large" color={AppStyle.main_color} />
            )
        } else {
            return (
                <>
                    <View style={styles.addKosanWrapper}>
                        <Text style={{ position: 'absolute', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Your Kosan: 2</Text>
                        <TouchableOpacityPrevent style={styles.addKosanButton}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(14) }}>Add Kosan</Text>
                        </TouchableOpacityPrevent>
                    </View>
                    <FlatList
                        data={KostList}
                        renderItem={_renderSearchList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        onEndReached={() => {
                            handleScroll();
                        }}
                        onEndReachedThreshold={0.1}
                    />
                </>
            )
        }
    }

    function Tracker() {
        return (
            <View></View>
        )
    }

    function TabContent() {

        if (tabIndex === 0) {
            return MyKosan();
        } else if (tabIndex === 1) {
            return Tracker();
        }
    }

    return (
        <MyKosanBackground>
            <View style={styles.tabButtonContainer}>
                <TouchableOpacityPrevent onPress={() => { setTabIndex(0) }} style={[styles.tabButton, { backgroundColor: tabIndex === 0 ? AppStyle.fourt_main_color : 'white' }]}>
                    <Text style={{ fontWeight: 'bold', color: tabIndex === 0 ? 'white' : 'black', fontSize: NormalizeFont(14) }}>My Kosan</Text>
                </TouchableOpacityPrevent>
                <TouchableOpacityPrevent onPress={() => { setTabIndex(1) }} style={[styles.tabButton, { backgroundColor: tabIndex === 1 ? AppStyle.fourt_main_color : 'white' }]}>
                    <Text style={{ fontWeight: 'bold', color: tabIndex === 1 ? 'white' : 'black', fontSize: NormalizeFont(14) }}>Tracker</Text>
                </TouchableOpacityPrevent>
            </View>
            <View style={styles.tabContainer}>
                <TabContent />
            </View>
        </MyKosanBackground>
    )
}

const styles = StyleSheet.create({
    tabButtonContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(60),
        elevation: Normalize(5),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: Normalize(20),
        width: AppStyle.windowSize.width * 0.8,
        marginTop: AppStyle.windowSize.height * 0.2 - (Normalize(60) / 2),
    },
    tabButton: {
        alignItems: 'center',
        height: Normalize(45),
        justifyContent: 'center',
        borderRadius: Normalize(15),
        width: AppStyle.windowSize.width * 0.375,
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
        height: (AppStyle.windowSize.height - ((AppStyle.windowSize.height * 0.2) + (Normalize(60) / 2) + (AppStyle.windowSize.width * 0.175) + (AppStyle.windowSize.width * 0.15 / 2))),
    },
    addKosanWrapper: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(60),
        justifyContent: 'center',
        width: AppStyle.windowSize.width,
    },
    addKosanButton: {
        position: 'absolute',
        alignItems: 'center',
        width: Normalize(90),
        height: Normalize(25),
        justifyContent: 'center',
        borderRadius: Normalize(10),
        right: AppStyle.windowSize.width * 0.05,
        backgroundColor: AppStyle.sub_main_color,
    },
    itemWrapper: {
        flexDirection: 'row',
        height: Normalize(100),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 1,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    thumbnailContainer: {
        alignSelf: 'center',
        width: Normalize(100),
        height: Normalize(100),
        left: AppStyle.windowSize.width * 0.05,
    },
    itemContainer: {
        alignSelf: 'center',
        height: Normalize(100),
        marginLeft: Normalize(20),
        paddingLeft: Normalize(15),
        justifyContent: 'space-evenly',
        width: AppStyle.windowSize.width * 0.9 * 0.525,
    },
    itemTitle: {
        justifyContent: 'center',
    },
    itemLocation: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemFacilitiesContainer: {
        flexDirection: 'column',
        height: AppStyle.windowSize.width * 0.9 * 0.375 * 0.3,
    },
    itemFacilities: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemPrice: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
})
