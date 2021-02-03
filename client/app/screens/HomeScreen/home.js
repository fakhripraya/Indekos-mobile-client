import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { AppStyle, Normalize } from '../../config/app.config';
import HomeBackground from '../../components/Backgrounds/home_background';
import { TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {

    // Function refs
    const newsCarouselRef = useRef(null);
    const bookCarouselRef = useRef(null);
    const promoCarouselRef = useRef(null);
    const nearYouCarouselRef = useRef(null);
    const recCarouselRef = useRef(null);

    // dummy
    let newsCaraouselData = [
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
    ];

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

    function _renderNewsItem({ item }) {

        return (
            <ImageBackground
                imageStyle={{ borderRadius: 25 }}
                style={styles.backgroundImg}
                source={{ uri: item.uri }}
            />
        )
    }

    function _renderBookList({ item }) {

        return (

            <View style={{ flexDirection: 'row' }}>
                {item.map((item, index) => {

                    return (
                        <View key={index} style={{ marginRight: Normalize(15), width: AppStyle.screenSize.width * 0.33, height: AppStyle.screenSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
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
                        </View>
                    )

                })}
            </View>
        )
    }

    function _renderPromoList({ item }) {

        return (

            <View style={{ flexDirection: 'row' }}>
                {item.map((item, index) => {

                    return (
                        <View key={index} style={{ marginRight: Normalize(15), width: AppStyle.screenSize.width * 0.33, height: AppStyle.screenSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
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
                        </View>
                    )

                })}
            </View>
        )
    }

    function _renderNearYouList({ item }) {

        return (

            <View style={{ flexDirection: 'row' }}>
                {item.map((item, index) => {

                    return (
                        <View key={index} style={{ marginRight: Normalize(15), width: AppStyle.screenSize.width * 0.33, height: AppStyle.screenSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
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
                        </View>
                    )

                })}
            </View>
        )
    }

    function _renderRecList({ item }) {

        return (

            <View style={{ flexDirection: 'row' }}>
                {item.map((item, index) => {

                    return (
                        <View key={index} style={{ marginRight: Normalize(15), width: AppStyle.screenSize.width * 0.33, height: AppStyle.screenSize.height * 0.26, borderWidth: 1, borderRadius: 25, borderColor: '#BBBBBB' }}>
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
                        </View>
                    )

                })}
            </View>
        )
    }

    return (
        <HomeBackground >
            <View style={styles.nameWrapper}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(18), color: 'white', left: AppStyle.screenSize.width * 0.075 }}><Text style={{ fontWeight: 'bold' }}>Hello</Text>, Mimin Oh</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ width: Normalize(24), justifyContent: 'center', alignItems: 'center', right: AppStyle.screenSize.width * 0.075 }}>
                        <FontAwesome5 name="bell" size={Normalize(24)} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.newsCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={newsCarouselRef}
                    data={newsCaraouselData}
                    itemWidth={AppStyle.screenSize.width * 0.9}
                    sliderWidth={AppStyle.screenSize.width * 0.9}
                    renderItem={_renderNewsItem}
                />
            </View>
            <View style={styles.bookListHeader}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.screenSize.width * 0.05, fontWeight: 'bold' }}>Book It Now</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ right: AppStyle.screenSize.width * 0.05 }}>
                        <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.timerContainer}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View style={{ left: Normalize(10), width: Normalize(39), height: 1, backgroundColor: '#BBBBBB' }} />
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ marginRight: Normalize(10), fontSize: Normalize(18), color: 'black', fontWeight: 'bold', color: AppStyle.main_color }}>Will be ended in</Text>
                    <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>1</Text></View>
                    <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>2</Text></View>
                    <Text style={{ marginRight: Normalize(5), fontSize: Normalize(14), color: AppStyle.main_color }}>:</Text>
                    <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>0</Text></View>
                    <View style={styles.timerBox}><Text style={{ fontSize: Normalize(14), color: 'white' }}>0</Text></View>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <View style={{ right: Normalize(10), width: Normalize(39), height: 1, backgroundColor: '#BBBBBB' }} />
                </View>
            </View>
            <View style={styles.bookListCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={bookCarouselRef}
                    data={bookCaraouselData}
                    itemWidth={AppStyle.screenSize.width * 0.9}
                    sliderWidth={AppStyle.screenSize.width * 0.9}
                    renderItem={_renderBookList}
                />
            </View>
            <View style={styles.promoListHeader}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.screenSize.width * 0.05, fontWeight: 'bold' }}>Promo</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ right: AppStyle.screenSize.width * 0.05 }}>
                        <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.promoListCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={promoCarouselRef}
                    data={promoCaraouselData}
                    itemWidth={AppStyle.screenSize.width * 0.9}
                    sliderWidth={AppStyle.screenSize.width * 0.9}
                    renderItem={_renderPromoList}
                />
            </View>
            <View style={{ width: '100%', top: Normalize(20), justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.screenSize.width * 0.05, fontWeight: 'bold' }}>Near You</Text>
            </View>
            <View style={styles.nearYouListHeader}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(14), color: AppStyle.third_main_color, left: AppStyle.screenSize.width * 0.05, fontWeight: 'bold' }}>West Jakarta</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ right: AppStyle.screenSize.width * 0.05 }}>
                        <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.nearYouListCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={nearYouCarouselRef}
                    data={nearYouCaraouselData}
                    itemWidth={AppStyle.screenSize.width * 0.9}
                    sliderWidth={AppStyle.screenSize.width * 0.9}
                    renderItem={_renderNearYouList}
                />
            </View>
            <View style={styles.recListHeader}>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: Normalize(18), color: 'black', left: AppStyle.screenSize.width * 0.05, fontWeight: 'bold' }}>Recommendation</Text>
                </View>
                <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity style={{ right: AppStyle.screenSize.width * 0.05 }}>
                        <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.recListCarouselContainer}>
                <Carousel
                    layout={"default"}
                    ref={recCarouselRef}
                    data={recCaraouselData}
                    itemWidth={AppStyle.screenSize.width * 0.9}
                    sliderWidth={AppStyle.screenSize.width * 0.9}
                    renderItem={_renderRecList}
                />
            </View>
        </HomeBackground>
    )
}

const styles = StyleSheet.create({

    nameWrapper: {
        height: AppStyle.screenSize.height * 0.15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    newsCarouselContainer: {
        top: Normalize(24),
        height: AppStyle.screenSize.height * 0.2,
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    bookListHeader: {
        height: Normalize(60),
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    timerContainer: {
        marginTop: Normalize(10),
        marginBottom: Normalize(10),
        height: AppStyle.screenSize.height / 16.14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerBox: {
        width: Normalize(17),
        height: Normalize(22),
        borderWidth: 1,
        marginRight: Normalize(5),
        borderRadius: Normalize(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppStyle.main_color
    },
    bookListCarouselContainer: {
        height: AppStyle.screenSize.height * 0.26,
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
    },
    promoListHeader: {
        height: Normalize(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    promoListCarouselContainer: {
        height: AppStyle.screenSize.height * 0.26,
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
    },
    nearYouListHeader: {
        height: Normalize(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nearYouListCarouselContainer: {
        height: AppStyle.screenSize.height * 0.26,
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
    },
    recListHeader: {
        height: Normalize(60),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recListCarouselContainer: {
        height: AppStyle.screenSize.height * 0.35,
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
    },
})
