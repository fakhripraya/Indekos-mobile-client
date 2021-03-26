import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { popUpModalChange } from '../../redux';
import { userLocationState } from '../../redux';
import { trackPromise } from 'react-promise-tracker';
import React, { useRef, useState, useEffect } from 'react';
import { AppStyle, KostService } from '../../config/app.config';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import { MappedFacilities } from '../../components/Icons/facilities';
import { useAxiosGetArrayParams } from '../../promise/axios_get_array';
import { CurrencyPrefix, CurrencyFormat } from '../../functions/currency';
import SearchBackground from '../../components/Backgrounds/search_background';
import withPreventDoubleClick from '../../components/HOC/prevent_double_click';
import { Entypo, MaterialIcons, AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ImageBackground, TouchableNativeFeedback, ActivityIndicator } from 'react-native';

// a HOC to throttle button click
const TouchableOpacityPrevent = withPreventDoubleClick(TouchableOpacity);
const TouchableNativeFeedbackPrevent = withPreventDoubleClick(TouchableNativeFeedback);

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function Search({ navigation }) {

    // Hooks
    const dispatch = useDispatch()

    // Function Refs
    const filterCarouselRef = useRef(null);

    // Function states
    const [filters, setFilters] = useState(null)
    // 0 = all kost // Initial val
    // 1 = Near You
    // 2 = Most Popular
    // 3 = Most Facilited
    // 4 = Most Expensive
    // 5 = Most Cheap
    const [selectedFilter, setSelectedFilters] = useState(0)
    const [requestConfig, setRequestConfig] = useState({})

    // Global Variable
    let KostList = [];
    let page = 1;

    //TODO: offer the user to activate the gps to enable using the nearby / near you filter
    dummyFilter = [
        [
            {
                id: 1,
                desc: "Near You",
                state: false,
            },
            {
                id: 2,
                desc: "Most Popular",
                state: false,
            },
            {
                id: 3,
                desc: "Most Facilited",
                state: false,
            },
            {
                id: 4,
                desc: "Most Expensive",
                state: false,
            },
            {
                id: 5,
                desc: "Most Cheap",
                state: false,
            }
        ],
    ]

    function _renderFilters({ item, index }) {
        let parent = index

        return (
            <View style={styles.buttonWrapper}>
                {item.map((item, index) => {

                    const txtColor = item.state ? "white" : 'black'
                    const bgColor = item.state ? AppStyle.fourt_main_color : "white"

                    return (
                        <TouchableOpacityPrevent key={index} onPress={() => { updateFilterList(index, parent) }}>
                            <View style={[styles.buttonPeriod, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                                <Text style={{ fontWeight: 'bold', color: txtColor, fontSize: NormalizeFont(12) }}>{item.desc}</Text>
                            </View>
                        </TouchableOpacityPrevent>
                    )

                })}
            </View>
        )
    }

    // update the state of the period
    const updateFilterList = (index, parent) => {

        const newArr = [...dummyFilter];

        if (filters[parent][index].state === false) {

            // set state to true
            newArr[parent][index].state = true;

            // if the selected filter is near you
            // user need to enable the location first
            // validate if the user location enabled or not
            if (filters[parent][index].id === 1) {
                (async () => {
                    // first permission
                    let { status } = await Location.requestPermissionsAsync();
                    if (status !== 'granted') {
                        dispatch(userLocationState({ locationPermission: false, location: null, locationFlag: true }));
                        return;
                    }

                    try {
                        // second permission
                        let location = await Location.getCurrentPositionAsync({});
                        dispatch(userLocationState({ locationPermission: true, location: location, locationFlag: true }));
                        setRequestConfig({
                            params: {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude
                            },
                            cancelToken: axios.CancelToken.source().token,
                            timeout: 10000
                        });
                    } catch (e) {
                        // if user didn't get to the second permission
                        setFilters(dummyFilter);
                        setSelectedFilters(0)
                        dispatch(userLocationState({ locationPermission: false, location: null, locationFlag: true }));
                        return;
                    }
                })();
                // set new state
                setFilters(newArr);
                setSelectedFilters(newArr[parent][index].id)
                return;
            } else {
                // set new state
                setSelectedFilters(newArr[parent][index].id)
            }
        }
        else {
            newArr[parent][index].state = false;
            setSelectedFilters(0)
        }

        setRequestConfig({});
        setFilters(newArr);
    }

    function SearchList() {

        // Get the kost data from the server
        // 1 page of kost list is 10 kost 
        const { dataArray, error } = useAxiosGetArrayParams(kostAPI, '/all/' + selectedFilter + '/' + page, requestConfig);
        KostList = dataArray;

        function _renderSearchList({ item }) {

            return (
                <TouchableNativeFeedbackPrevent onPress={() => {
                    navigation.push('BookStack', {
                        screen: 'KostDetail',
                        params: {
                            kostID: item.kost.id,
                            kostName: item.kost.kost_name,
                            city: item.kost.city,
                        }
                    })
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
                        <View style={styles.favButtonContainer}>
                            <TouchableOpacityPrevent style={styles.favButton}>
                                <MaterialIcons name="favorite-outline" size={Normalize(18)} color="red" />
                            </TouchableOpacityPrevent>
                        </View>
                    </View >
                </TouchableNativeFeedbackPrevent>
            )
        }

        function handleScroll() {

            page++;

            trackPromise(
                kostAPI.get('/all/' + selectedFilter + '/' + page, requestConfig)
                    .then(response => {
                        //TODO: check all axios request after the prototype done
                        response.data.forEach(function (item, index) {
                            KostList.push(item)
                        });
                    })
                    .catch(error => {
                        if (!axios.isCancel(error)) {
                            if (error.response.status !== 200) {

                                // dispatch the popUpModalChange actions to store the generic message modal state
                                dispatch(popUpModalChange({ show: true, title: 'ERROR', message: error.response.data.message }));
                            }
                        }
                    })
            );

        }

        if (KostList === null) {
            return (
                <View style={styles.flatListContainer}>
                    <ActivityIndicator size="large" color={AppStyle.main_color} />
                </View>
            )
        } else {
            return (
                <View style={styles.flatListContainer}>
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
                </View>
            )
        }

    }

    useEffect(() => {
        if (filters === null)
            setFilters(dummyFilter)

        return () => {
        }
    }, [])

    if (filters === null) {
        return null
    } else {
        return (
            <SearchBackground>
                <View style={styles.headerContainer}>
                    <View style={styles.searchBar}>
                        <TextInput />
                    </View>
                    <View style={styles.carouselContainer}>
                        <FlatList
                            ref={filterCarouselRef}
                            data={filters}
                            renderItem={_renderFilters}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={1}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={styles.sortButtonWrapperContaner}>
                    <View style={styles.sortButtonWrapper}>
                        <TouchableOpacity style={[styles.sortButton, { borderRightWidth: 1, flexDirection: 'row' }]}>
                            <AntDesign name="filter" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.sortButton, { flexDirection: 'row' }]}>
                            <MaterialCommunityIcons name="sort" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Sort</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.sortButton, { borderLeftWidth: 1, flexDirection: 'row' }]}>
                            <Ionicons name="map-outline" size={Normalize(24)} color="black" style={{ marginRight: Normalize(5) }} />
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: NormalizeFont(12) }}>Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SearchList />
            </SearchBackground>
        )
    }
}

const styles = StyleSheet.create({

    headerContainer: {
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.275,
    },
    searchBar: {
        position: 'absolute',
        height: Normalize(40),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: Normalize(10),
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((AppStyle.windowSize.height * 0.275) / 2) - (Normalize(36) / 2),
    },
    carouselContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((((AppStyle.windowSize.height * 0.275) / 2) + (AppStyle.windowSize.height * 0.275) / 3)) - (Normalize(36) / 2),
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonPeriod: {
        borderWidth: 1,
        alignItems: 'center',
        padding: Normalize(10),
        justifyContent: 'center',
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
        borderColor: 'rgba(0, 0, 0, 0.15)',
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
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: Normalize(42),
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
    },
    sortButton: {
        alignItems: 'center',
        height: Normalize(30),
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        width: AppStyle.windowSize.width * 0.9 / 3,
    },
    flatListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height - ((AppStyle.windowSize.height * 0.275) + Normalize(60) + (AppStyle.windowSize.width * 0.2)),
    },
    itemWrapper: {
        flexDirection: 'row',
        height: Normalize(100),
        marginBottom: Normalize(15),
        justifyContent: 'space-between',
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
    favButtonContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9 * 0.100,
        height: AppStyle.windowSize.width * 0.9 * 0.375,
    },
    favButton: {
        elevation: 2,
        alignItems: 'center',
        width: Normalize(34),
        padding: Normalize(5),
        height: Normalize(34),
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: Normalize(100),
        right: AppStyle.windowSize.width * 0.05,
    },
})
