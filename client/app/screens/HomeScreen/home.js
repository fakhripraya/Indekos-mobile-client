import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import React, { useEffect, useRef, useState } from 'react';
import HomeBackground from '../../components/Backgrounds/home_background';
import { AppStyle, Normalize, AuthService, KostService, BookService } from '../../config/app.config';

// creates the promised base http client
const authAPI = axios.create({
    baseURL: "http://" + AuthService.host + AuthService.port + "/"
})

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

// axios cancel source
var cancelSource

export default function Home({ navigation }) {

    const userLocation = useSelector(state => state.userReducer.location);
    const userLocationPermission = useSelector(state => state.userReducer.locationPermission);

    // Function refs
    const recCarouselRef = useRef(null);
    const newsCarouselRef = useRef(null);
    const bookCarouselRef = useRef(null);
    const promoCarouselRef = useRef(null);
    const nearYouCarouselRef = useRef(null);

    let bookCaraouselData = [
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Testis",
                alamat: "Kebon Jeruk",
                harga: "Rp. 2100.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
    ];

    let promoCaraouselData = [
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Testis",
                alamat: "Kebon Jeruk",
                harga: "Rp. 2100.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
    ];

    let nearYouCaraouselData = [
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Testis",
                alamat: "Kebon Jeruk",
                harga: "Rp. 2100.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
    ];

    let recCaraouselData = [
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Testis",
                alamat: "Kebon Jeruk",
                harga: "Rp. 2100.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
        [
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost TasTus",
                alamat: "Pekayon",
                harga: "Rp. 2200.000",
            },
            {
                uri: "https://reactjs.org/logo-og.png",
                nama: "Kost Majapahit",
                alamat: "Tanah Abang",
                harga: "Rp. 2000.000",
            },
        ],
    ];

    function NameWrapper() {

        var [userInfo, setUserInfo] = useState({})

        // event before component mount/update/leave
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to url in the authentication service to fetch the logged in users
            authAPI.get('/', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setUserInfo(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                // cancel the request (the message parameter is optional)
                cancelSource.cancel();
            }
        }, []);

        return (
            <View style={styles.nameWrapper}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(18), color: 'white', left: AppStyle.windowSize.width * 0.075 }}><Text style={{ fontWeight: 'bold' }}>Hello</Text>, {userInfo.displayname}</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ width: Normalize(24), justifyContent: 'center', alignItems: 'center', right: AppStyle.windowSize.width * 0.075 }}>
                        <FontAwesome5 name="bell" size={Normalize(24)} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function NewsCarousel() {

        var [eventList, setEventList] = useState([])

        // event before component mount/update/leave
        useEffect(() => {

            // creates the cancel token source
            cancelSource = axios.CancelToken.source()

            // triggers the http get request to / url in the kost service to fetch the list of application events
            kostAPI.get('/event/all', {
                cancelToken: cancelSource.token
            })
                .then(response => {
                    setEventList(response.data)
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        // TODO: development only
                        console.log('Request canceled', error.message);
                    } else {
                        console.log(error.response.data)
                    }
                });
            return () => {
                // cancel the request (the message parameter is optional)
                cancelSource.cancel();
            }
        }, []);

        function _renderNewsItem({ item }) {

            return (
                <ImageBackground
                    imageStyle={{ borderRadius: 25 }}
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
                    data={eventList}
                    itemWidth={AppStyle.windowSize.width * 0.9}
                    sliderWidth={AppStyle.windowSize.width * 0.9}
                    renderItem={_renderNewsItem}
                />
            </View>
        )
    }

    function BookCarousel() {

        function _renderBookList({ item }) {

            return (

                <View style={{ flexDirection: 'row' }}>
                    {item.map((item, index) => {

                        return (
                            <TouchableOpacity onPress={() => { navigation.push('BookStack') }} key={index} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
                                <View style={{ height: '50%' }}>
                                    <ImageBackground
                                        imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                                        style={styles.backgroundImg}
                                        source={{ uri: item.uri }}
                                    />
                                </View>
                                <View style={{ height: '50%' }}>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.nama}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.alamat}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.bookListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Book It Now</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.timerContainer}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ left: Normalize(10), width: Normalize(39), height: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    </View>
                    <View style={{ width: AppStyle.windowSize.width - Normalize(98), position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ marginRight: Normalize(10), fontSize: Normalize(18), color: 'black', fontWeight: 'bold', color: AppStyle.main_color }}>Will be ended in</Text>
                        <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>1</Text></View>
                        <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>2</Text></View>
                        <Text style={{ marginRight: Normalize(5), fontSize: Normalize(14), color: AppStyle.main_color }}>:</Text>
                        <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>0</Text></View>
                        <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>0</Text></View>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <View style={{ right: Normalize(10), width: Normalize(39), height: 1, backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    </View>
                </View>
                <View style={styles.bookListCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={bookCarouselRef}
                        data={bookCaraouselData}
                        itemWidth={AppStyle.windowSize.width * 0.9}
                        sliderWidth={AppStyle.windowSize.width * 0.9}
                        renderItem={_renderBookList}
                    />
                </View>
            </React.Fragment>
        )
    }

    function PromoCarousel() {

        function _renderPromoList({ item }) {

            return (

                <View style={{ flexDirection: 'row' }}>
                    {item.map((item, index) => {

                        return (
                            <TouchableOpacity key={index} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
                                <View style={{ height: '50%' }}>
                                    <ImageBackground
                                        imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                                        style={styles.backgroundImg}
                                        source={{ uri: item.uri }}
                                    />
                                </View>
                                <View style={{ height: '50%' }}>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.nama}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.alamat}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.promoListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Promo</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.promoListCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={promoCarouselRef}
                        data={promoCaraouselData}
                        itemWidth={AppStyle.windowSize.width * 0.9}
                        sliderWidth={AppStyle.windowSize.width * 0.9}
                        renderItem={_renderPromoList}
                    />
                </View>
            </React.Fragment>
        )
    }

    function NearYouCarousel() {

        var [nearYouList, setNearYouList] = useState([])

        if (locationPermission === true) {
            // event before component mount/update/leave
            useEffect(() => {

                // creates the cancel token source
                cancelSource = axios.CancelToken.source()

                // triggers the http get request to / url in the kost service to fetch the list of application events
                kostAPI.get('/my/near', {
                    cancelToken: cancelSource.token
                })
                    .then(response => {
                        setNearYouList(response.data)
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            // TODO: development only
                            console.log('Request canceled', error.message);
                        } else {
                            console.log(error.response.data)
                        }
                    });
                return () => {
                    // cancel the request (the message parameter is optional)
                    cancelSource.cancel();
                }
            }, []);
        }

        function _renderNearYouList({ item }) {

            return (

                <View style={{ flexDirection: 'row' }}>
                    {item.map((item, index) => {

                        return (
                            <TouchableOpacity key={index} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
                                <View style={{ height: '50%' }}>
                                    <ImageBackground
                                        imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                                        style={styles.backgroundImg}
                                        source={{ uri: item.uri }}
                                    />
                                </View>
                                <View style={{ height: '50%' }}>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.nama}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.alamat}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            )
        }

        if (userLocationPermission === false) {
            return null
        } else {
            return (
                <React.Fragment>
                    <View style={{ width: '100%', top: Normalize(20), justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold', marginBottom: Normalize(5) }}>Near You</Text>
                    </View>
                    <View style={styles.nearYouListHeader}>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: Normalize(14), color: AppStyle.third_main_color, left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>West Jakarta</Text>
                        </View>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                                <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.nearYouListCarouselContainer}>
                        <Carousel
                            layout={"default"}
                            ref={nearYouCarouselRef}
                            data={nearYouCaraouselData}
                            itemWidth={AppStyle.windowSize.width * 0.9}
                            sliderWidth={AppStyle.windowSize.width * 0.9}
                            renderItem={_renderNearYouList}
                        />
                    </View>
                </React.Fragment>
            )
        }
    }

    function RecommendedCarousel() {

        function _renderRecList({ item }) {

            return (

                <View style={{ flexDirection: 'row' }}>
                    {item.map((item, index) => {

                        return (
                            <TouchableOpacity key={index} style={{ marginRight: Normalize(15), width: AppStyle.windowSize.width * 0.33, height: AppStyle.windowSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
                                <View style={{ height: '50%' }}>
                                    <ImageBackground
                                        imageStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                                        style={styles.backgroundImg}
                                        source={{ uri: item.uri }}
                                    />
                                </View>
                                <View style={{ height: '50%' }}>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.nama}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.alamat}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                    <View style={{ left: Normalize(10), height: '25%' }}>
                                        <Text style={{ fontSize: Normalize(10), fontWeight: 'bold' }}>{item.harga}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )

                    })}
                </View>
            )
        }

        return (
            <React.Fragment>
                <View style={styles.recListHeader}>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.windowSize.width * 0.05, fontWeight: 'bold' }}>Recommendation</Text>
                    </View>
                    <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ right: AppStyle.windowSize.width * 0.05 }}>
                            <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.recListCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={recCarouselRef}
                        data={recCaraouselData}
                        itemWidth={AppStyle.windowSize.width * 0.9}
                        sliderWidth={AppStyle.windowSize.width * 0.9}
                        renderItem={_renderRecList}
                    />
                </View>
            </React.Fragment>
        )
    }

    return (
        <HomeBackground >
            <View style={{ height: AppStyle.windowSize.height * 2.075 }}>
                <NameWrapper />
                <NewsCarousel />
                <BookCarousel />
                <PromoCarousel />
                <NearYouCarousel />
                <RecommendedCarousel />
            </View>
        </HomeBackground>
    )
}

const styles = StyleSheet.create({

    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: AppStyle.windowSize.height * 0.15,
    },
    newsCarouselContainer: {
        alignSelf: 'center',
        width: AppStyle.windowSize.width * 0.9,
        top: AppStyle.windowSize.height * 0.025,
        height: AppStyle.windowSize.height * 0.2,
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
        marginBottom: Normalize(100),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.26,
    },
})
