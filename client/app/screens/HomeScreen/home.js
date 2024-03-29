import axios from 'axios';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import React, { useRef, useState, useEffect } from 'react';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import SkeletonLoading from '../../components/Feedback/skeleton_loading';
import { CurrencyPrefix, CurrencyFormat } from '../../functions/currency';
import HomeBackground from '../../components/Backgrounds/home_background';
import { AppStyle, AuthService, KostService } from '../../config/app.config';
import { Text, View, FlatList, StyleSheet, ImageBackground, InteractionManager, ActivityIndicator } from 'react-native';

// creates the promised base http auth client
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// creates the promised base http kost client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function Home({ navigation }) {

    // Function Hooks
    const [isReady, setIsReady] = useState(false)
    const [userLocation, setUserLocation] = useState(null)
    const [userLocationPermission, setUserLocationPermission] = useState(false)

    // Function refs
    const recCarouselRef = useRef(null);
    const newsCarouselRef = useRef(null);
    const bookCarouselRef = useRef(null);
    const promoCarouselRef = useRef(null);
    const nearYouCarouselRef = useRef(null);

    // run after render
    useEffect(() => {

        // prevent update on unmounted component
        let unmounted = false;

        if (unmounted === false) {
            InteractionManager.runAfterInteractions(() => {
                (async () => {

                    let { status } = await Location.requestPermissionsAsync();
                    if (status !== 'granted') {
                        setUserLocationPermission(await Location.hasServicesEnabledAsync());
                        setIsReady(true);
                        return;
                    }

                    try {
                        let location = await Location.getCurrentPositionAsync({});
                        setUserLocation(location)
                        setUserLocationPermission(await Location.hasServicesEnabledAsync());
                        setIsReady(true);
                        return;

                    } catch (e) {
                        setUserLocationPermission(await Location.hasServicesEnabledAsync());
                        setIsReady(true);
                        return;
                    }
                })();
            });
        }

        return () => {
            unmounted = true;
        }
    }, [])

    let bookCaraouselData = [
        {
            id: 9,
            owner_id: 3,
            kost_name: "Kost Pertamina",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1100000,
            currency: "rupiah"
        },
        {
            id: 16,
            owner_id: 3,
            kost_name: "Kost Pertamax",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1500000,
            currency: "rupiah"
        },
        {
            id: 4,
            owner_id: 14,
            kost_name: "Kost kosan bapak fakhri",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
        {
            id: 11,
            owner_id: 3,
            kost_name: "Kost kosan bapak ari",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
    ];

    let promoCaraouselData = [
        {
            id: 9,
            owner_id: 3,
            kost_name: "Kost Pertamina",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1100000,
            currency: "rupiah"
        },
        {
            id: 16,
            owner_id: 3,
            kost_name: "Kost Pertamax",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1500000,
            currency: "rupiah"
        },
        {
            id: 4,
            owner_id: 14,
            kost_name: "Kost kosan bapak fakhri",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
        {
            id: 11,
            owner_id: 3,
            kost_name: "Kost kosan bapak ari",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
    ];

    let recCaraouselData = [
        {
            id: 9,
            owner_id: 3,
            kost_name: "Kost Pertamina",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1100000,
            currency: "rupiah"
        },
        {
            id: 16,
            owner_id: 3,
            kost_name: "Kost Pertamax",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/nature",
            price: 1500000,
            currency: "rupiah"
        },
        {
            id: 4,
            owner_id: 14,
            kost_name: "Kost kosan bapak fakhri",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
        {
            id: 11,
            owner_id: 3,
            kost_name: "Kost kosan bapak ari",
            city: "Jakarta Selatan",
            thumbnail_url: "http://lorempixel.com/640/480/people",
            price: 1800000,
            currency: "rupiah"
        },
    ];

    function NameWrapper() {

        // Function Hooks
        var [status, setStatus] = useState(null)
        var [data, setData] = useState(null)

        useEffect(() => {
            // prevent update on unmounted component
            let unmounted = false;
            // creates the cancel token source
            var cancelSource = axios.CancelToken.source()

            authAPI.get('/', {
                cancelToken: cancelSource.token,
                timeout: 10000
            })
                .then(response => {
                    if (!unmounted) {
                        setData(response.data);
                        setStatus(response.status)
                    }
                })
                .catch(error => {
                    if (!unmounted) {
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                setStatus(error.response.status)
                            }
                        }
                    }
                });

            return () => {
                unmounted = true;
                cancelSource.cancel();
            }
        }, []);

        if (status === null) {
            return (
                <View style={styles.nameWrapper}>
                    <View style={{ width: '40%', height: Normalize(24), position: 'absolute', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#ebebeb', overflow: 'hidden', left: AppStyle.windowSize.width * 0.075, borderRadius: Normalize(25) }}>
                        <SkeletonLoading />
                    </View>
                    <View style={{ width: Normalize(24), height: Normalize(24), position: 'absolute', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#ebebeb', overflow: 'hidden', left: AppStyle.windowSize.width - Normalize(24) - AppStyle.windowSize.width * 0.075, borderRadius: Normalize(25) }}>
                        <SkeletonLoading />
                    </View>
                </View>
            )
        }
        else if (status !== 200) {
            return (
                <Text>Retry pls</Text>
            )
        }
        else {
            return (
                <View style={styles.nameWrapper}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: NormalizeFont(18), color: 'white', left: AppStyle.windowSize.width * 0.075 }}><Text style={{ fontWeight: 'bold' }}>Hello</Text>, {data.displayname}</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ width: Normalize(24), justifyContent: 'center', alignItems: 'center', right: AppStyle.windowSize.width * 0.075 }}>
                            <FontAwesome5 name="bell" size={Normalize(24)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    function NewsCarousel() {

        // Function Hooks
        var [status, setStatus] = useState(null)
        var [dataArray, setDataArray] = useState([])

        useEffect(() => {
            // prevent update on unmounted component
            let unmounted = false;
            // creates the cancel token source
            var cancelSource = axios.CancelToken.source()

            kostAPI.get('/event/all', {
                cancelToken: cancelSource.token,
                timeout: 10000
            })
                .then(response => {
                    if (!unmounted) {
                        if (response.data !== null)
                            setDataArray(response.data);

                        setStatus(response.status)
                    }
                })
                .catch(error => {
                    if (!unmounted) {
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                setStatus(error.response.status)
                            }
                        }
                    }
                });

            return () => {
                unmounted = true;
                cancelSource.cancel();
            }
        }, []);

        if (status === null) {
            return (
                <View style={[styles.newsCarouselContainer, { overflow: 'hidden', backgroundColor: '#ebebeb', borderRadius: Normalize(15) }]}>
                    <SkeletonLoading />
                </View>
            );
        }
        else if (status !== 200) {
            return (
                <Text>Retry pls</Text>
            )
        }
        else {
            function _renderNewsItem({ item }) {
                return (
                    <ImageBackground
                        imageStyle={{ borderRadius: Normalize(15) }}
                        style={styles.backgroundImg}
                        source={{ uri: item.thumbnail }}
                    />
                )
            }

            return (
                <View style={styles.newsCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={newsCarouselRef}
                        data={dataArray}
                        itemWidth={AppStyle.windowSize.width * 0.9}
                        sliderWidth={AppStyle.windowSize.width * 0.9}
                        renderItem={_renderNewsItem}
                    />
                </View>
            );
        }
    }

    function BookCarousel() {

        function _renderBookList({ item }) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.push('BookStack', {
                            screen: 'KostDetail',
                            params: {
                                kost: item
                            }
                        })
                    }} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: Normalize(10), borderColor: '#BBBBBB' }}>
                        <View style={{ height: '50%' }}>
                            <ImageBackground
                                imageStyle={{ borderTopLeftRadius: Normalize(10), borderTopRightRadius: Normalize(10) }}
                                style={styles.backgroundImg}
                                source={{ uri: item.thumbnail_url }}
                            />
                        </View>
                        <View style={{ height: '50%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: Normalize(10), paddingRight: Normalize(10) }}>
                            <View style={{ height: '40%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost_name}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{item.city}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{CurrencyFormat(CurrencyPrefix(item.currency), item.price).length > 15 ? CurrencyFormat(CurrencyPrefix(item.currency), item.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(item.currency), item.price)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.bookListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: NormalizeFont(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Book It Now</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.timerContainer}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ left: Normalize(10), width: Normalize(39), height: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    </View>
                    <View style={{ width: AppStyle.windowSize.width - Normalize(98), position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ marginRight: Normalize(10), fontSize: NormalizeFont(18), color: 'black', fontWeight: 'bold', color: AppStyle.main_color }}>Will be ended in</Text>
                        <View style={styles.timerBox}><Text style={{ fontSize: NormalizeFont(14), color: 'white' }}>1</Text></View>
                        <View style={styles.timerBox}><Text style={{ fontSize: NormalizeFont(14), color: 'white' }}>2</Text></View>
                        <Text style={{ marginRight: Normalize(5), fontSize: NormalizeFont(14), color: AppStyle.main_color }}>:</Text>
                        <View style={styles.timerBox}><Text style={{ fontSize: NormalizeFont(14), color: 'white' }}>0</Text></View>
                        <View style={styles.timerBox}><Text style={{ fontSize: NormalizeFont(14), color: 'white' }}>0</Text></View>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <View style={{ right: Normalize(10), width: Normalize(39), height: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    </View>
                </View>
                <View style={styles.bookListCarouselContainer}>
                    <FlatList
                        ref={bookCarouselRef}
                        data={bookCaraouselData}
                        renderItem={_renderBookList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </React.Fragment>
        )
    }

    function PromoCarousel() {

        function _renderPromoList({ item }) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.push('BookStack', {
                            screen: 'KostDetail',
                            params: {
                                kost: item
                            }
                        })
                    }} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: Normalize(10), borderColor: '#BBBBBB' }}>
                        <View style={{ height: '50%' }}>
                            <ImageBackground
                                imageStyle={{ borderTopLeftRadius: Normalize(10), borderTopRightRadius: Normalize(10) }}
                                style={styles.backgroundImg}
                                source={{ uri: item.thumbnail_url }}
                            />
                        </View>
                        <View style={{ height: '50%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: Normalize(10), paddingRight: Normalize(10) }}>
                            <View style={{ height: '40%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost_name}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{item.city}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{CurrencyFormat(CurrencyPrefix(item.currency), item.price).length > 15 ? CurrencyFormat(CurrencyPrefix(item.currency), item.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(item.currency), item.price)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.promoListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: NormalizeFont(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Promo</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.promoListCarouselContainer}>
                    <FlatList
                        ref={promoCarouselRef}
                        data={promoCaraouselData}
                        renderItem={_renderPromoList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </React.Fragment>
        )
    }

    function NearYouCarousel() {

        // Function Hooks
        var [status, setStatus] = useState(null)
        var [dataArray, setDataArray] = useState([])

        useEffect(() => {
            // prevent update on unmounted component
            let unmounted = false;
            // creates the cancel token source
            var cancelSource = axios.CancelToken.source()

            // Get the data via axios get request
            if (userLocationPermission === true) {
                kostAPI.get('/all/near', {
                    params: {
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude
                    },
                    cancelToken: cancelSource.token,
                    timeout: 10000
                })
                    .then(response => {
                        if (!unmounted) {
                            if (response.data !== null)
                                setDataArray(response.data);

                            setStatus(response.status)
                        }
                    })
                    .catch(error => {
                        if (!unmounted) {
                            if (typeof (error.response) !== 'undefined') {
                                if (!axios.isCancel(error)) {
                                    setStatus(error.response.status)
                                }
                            }
                        }
                    });
            }

            return () => {
                unmounted = true;
                cancelSource.cancel();
            }
        }, []);

        if (userLocationPermission === false) {
            return null
        } else {
            if (status === null) {
                return (
                    <>
                        <View style={{ width: '100%', top: Normalize(20), justifyContent: 'center', alignItems: 'flex-start', marginBottom: Normalize(10) }}>
                            <Text style={{ fontSize: NormalizeFont(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold', marginBottom: Normalize(5) }}>Near You</Text>
                        </View>
                        <View style={styles.nearYouListHeader}>
                            <View style={{ width: '40%', height: Normalize(24), position: 'absolute', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#ebebeb', overflow: 'hidden', left: AppStyle.windowSize.width * 0.05, borderRadius: Normalize(10) }}>
                                <SkeletonLoading />
                            </View>
                            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity disabled={true} style={{ right: AppStyle.windowSize.width * 0.05 }}>
                                    <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.nearYouListCarouselContainer, { overflow: 'hidden', backgroundColor: '#ebebeb', borderTopLeftRadius: Normalize(10), borderBottomLeftRadius: Normalize(10) }]}>
                            <SkeletonLoading />
                        </View>
                    </>
                )
            }
            else if (status !== 200) {
                return (
                    <Text>Retry pls</Text>
                )
            }
            else {
                function _renderNearYouList({ item }) {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.push('BookStack', {
                                    screen: 'KostDetail',
                                    params: {
                                        kost: item
                                    }
                                })
                            }} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: Normalize(10), borderColor: '#BBBBBB' }}>
                                <View style={{ height: '50%' }}>
                                    <ImageBackground
                                        imageStyle={{ borderTopLeftRadius: Normalize(10), borderTopRightRadius: Normalize(10) }}
                                        style={styles.backgroundImg}
                                        source={{ uri: item.thumbnail_url }}
                                    />
                                </View>
                                <View style={{ height: '50%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: Normalize(10), paddingRight: Normalize(10) }}>
                                    <View style={{ height: '40%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost_name}</Text>
                                    </View>
                                    <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{item.city}</Text>
                                    </View>
                                    <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{CurrencyFormat(CurrencyPrefix(item.currency), item.price).length > 15 ? CurrencyFormat(CurrencyPrefix(item.currency), item.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(item.currency), item.price)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }

                return (
                    <>
                        <View style={{ width: '100%', top: Normalize(20), justifyContent: 'center', alignItems: 'flex-start', marginBottom: Normalize(10) }}>
                            <Text style={{ fontSize: NormalizeFont(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold', marginBottom: Normalize(5) }}>Near You</Text>
                        </View>
                        <View style={styles.nearYouListHeader}>
                            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: NormalizeFont(14), color: AppStyle.third_main_color, left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>{dataArray === null ? "" : (dataArray.length === 0 ? "" : dataArray[0].city)}</Text>
                            </View>
                            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                                    <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.nearYouListCarouselContainer}>
                            <FlatList
                                ref={nearYouCarouselRef}
                                data={dataArray}
                                renderItem={_renderNearYouList}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </>
                )
            }
        }
    }

    function RecommendedCarousel() {

        function _renderRecList({ item }) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.push('BookStack', {
                            screen: 'KostDetail',
                            params: {
                                kost: item
                            }
                        })
                    }} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: Normalize(10), borderColor: '#BBBBBB' }}>
                        <View style={{ height: '50%' }}>
                            <ImageBackground
                                imageStyle={{ borderTopLeftRadius: Normalize(10), borderTopRightRadius: Normalize(10) }}
                                style={styles.backgroundImg}
                                source={{ uri: item.thumbnail_url }}
                            />
                        </View>
                        <View style={{ height: '50%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: Normalize(10), paddingRight: Normalize(10) }}>
                            <View style={{ height: '40%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{item.kost_name}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{item.city}</Text>
                            </View>
                            <View style={{ height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: NormalizeFont(10), fontWeight: 'bold' }}>{CurrencyFormat(CurrencyPrefix(item.currency), item.price).length > 15 ? CurrencyFormat(CurrencyPrefix(item.currency), item.price).substring(0, 15).replace(/\s*$/, "") + '...' : CurrencyFormat(CurrencyPrefix(item.currency), item.price)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.recListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: NormalizeFont(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Recommendation</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recListCarouselContainer}>
                    <FlatList
                        ref={recCarouselRef}
                        data={recCaraouselData}
                        renderItem={_renderRecList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </React.Fragment>
        )
    }
    if (isReady === false) {
        // Renders the Loading screen
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    } else {
        return (
            <HomeBackground >
                <NameWrapper />
                <NewsCarousel />
                <BookCarousel />
                <PromoCarousel />
                <NearYouCarousel />
                <RecommendedCarousel />
            </HomeBackground>
        )
    }
}

const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: AppStyle.windowSize.height * 0.15,
    },
    newsCarouselContainer: {
        alignSelf: 'center',
        height: Normalize(125),
        width: AppStyle.windowSize.width * 0.9,
        top: AppStyle.windowSize.height * 0.025,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    bookListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: AppStyle.windowSize.height * 0.025,
        height: AppStyle.windowSize.height * 0.085,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height / 16.14,
        marginTop: AppStyle.windowSize.height * 0.015,
        marginBottom: AppStyle.windowSize.height * 0.015,
    },
    timerBox: {
        borderWidth: 1,
        width: Normalize(17),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Normalize(5),
        borderRadius: Normalize(5),
        backgroundColor: AppStyle.main_color,
        height: AppStyle.windowSize.height * 0.040,
    },
    bookListCarouselContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.26,
    },
    promoListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.085,
    },
    promoListCarouselContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.26,
    },
    nearYouListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.085,
    },
    nearYouListCarouselContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.26,
    },
    recListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppStyle.windowSize.height * 0.085,
    },
    recListCarouselContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.26,
        marginBottom: ((AppStyle.windowSize.width * 0.15 / 2) + (AppStyle.windowSize.width * 0.175) + Normalize(30))
    }
})
