import React, { useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import MapShow from '../../components/Maps/map_show';
import { AppStyle, Normalize } from '../../config/app.config';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeBackground from '../../components/Backgrounds/book_background';
import StickyBottom from '../../components/StickyBottom/kost_detail_bottom';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, FontAwesome5, SimpleLineIcons, Octicons } from '@expo/vector-icons';
import { normalize } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function KostDetail({ navigation }) {

    // Function refs
    const kostPictRef = useRef(null);
    const roomPictRef = useRef(null);

    // dummy
    let kostCaraouselData = [
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
        { uri: "https://reactjs.org/logo-og.png" },
    ];

    let kostFacilities = [
        {
            id: "0",
            name: "AC"
        },
        {
            id: "1",
            name: "Canteen"
        },
        {
            id: "2",
            name: "24 Hours Security"
        },
        {
            id: "3",
            name: "Wifi"
        },
    ];

    let kostBenchmark = [
        {
            id: "0",
            name: "Mie Ayam Santika 99 "
        },
        {
            id: "1",
            name: "Warung Pak Muh"
        },
    ];

    let kostAccessibility = [
        {
            id: "0",
            name: "Mikrolet M24"
        },
        {
            id: "1",
            name: "Kopaja 609"
        },
    ];

    let aroundKost = [
        {
            id: "0",
            icon_id: "0",
            name: "GOR Kedoya"
        },
        {
            id: "1",
            icon_id: "1",
            name: "Mall Citraland"
        },
        {
            id: "2",
            icon_id: "2",
            name: "Alfamart"
        },
        {
            id: "3",
            icon_id: "3",
            name: "JNE"
        },
        {
            id: "4",
            icon_id: "4",
            name: "Restaurant"
        },
    ];

    let reviewList = [
        {
            id: "0",
            user_id: "0",
            user_pict: "https://reactjs.org/logo-og.png",
            nama_user: "Budi Utami",
            rating: "4.9",
            review_body: "Kosannya rapih banget, overall suka sama pelayanannya!"
        },
        {
            id: "1",
            user_id: "1",
            user_pict: "https://reactjs.org/logo-og.png",
            nama_user: "Joko Anwar",
            rating: "4.6",
            review_body: "Yah lumayan lah dari pada saya gelandangan"
        },
        {
            id: "2",
            user_id: "2",
            user_pict: "https://reactjs.org/logo-og.png",
            nama_user: "Sakhi Ali",
            rating: "4.8",
            review_body: "Harga terjangkau untuk fasilitas yang semewah ini, like it!"
        },
    ];

    let roomList = [
        {
            kost_id: "0",
            room_id: "0",
            room_pict: [
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png"
            ],
            room_name: "Luxury",
            room_size: "20m x 20m",
            room_price: "Rp.3.000.000",
            room_availability: 2,
        },
        {
            kost_id: "0",
            room_id: "1",
            room_pict: [
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png"
            ],
            room_name: "Standard",
            room_size: "15m x 15m",
            room_price: "Rp.2.500.000",
            room_availability: 7,
        },
        {
            kost_id: "0",
            room_id: "2",
            room_pict: [
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png"
            ],
            room_name: "Standard",
            room_size: "10m x 10m",
            room_price: "Rp.2.000.000",
            room_availability: 4,
        },
        {
            kost_id: "0",
            room_id: "3",
            room_pict: [
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png",
                "https://reactjs.org/logo-og.png"
            ],
            room_name: "Singular",
            room_size: "5m x 10m",
            room_price: "Rp.1.000.000",
            room_availability: 5,
        },
    ];

    let kostOwner = {
        user_id: 10,
        user_pict: "https://reactjs.org/logo-og.png",
        user_name: "Mimin Oh",
        location: "DKI Jakarta",
        kost_count: 2,
    }

    let selectedKost = {
        kost_id: 0,
        user_id: 10,
        kost_name: "Kosan Tarima",
        kost_location: "Jakarta Selatan",
        recommend_price: "Rp.3.000.000",
        pay_period: "Month"
    }

    function _renderKostPict({ item }) {

        return (

            <ImageBackground
                style={styles.backgroundImg}
                source={{ uri: item.uri }}
            />
        )
    }

    function _renderRoomPict({ item }) {

        return (

            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                style={[styles.backgroundImg, { height: AppStyle.windowSize.height * 0.2 }]}
                source={{ uri: item }}
            />
        )
    }

    function MappedFacilities() {

        function Icon({ children }) {

            if (children == 0)
                return <FontAwesome name="snowflake-o" size={Normalize(14)} color={AppStyle.third_main_color} />
            else if (children == 1)
                return <MaterialIcons name="storefront" size={Normalize(14)} color={AppStyle.third_main_color} />
            else if (children == 2)
                return <AntDesign name="unlock" size={Normalize(14)} color={AppStyle.third_main_color} />
            else if (children == 3)
                return <AntDesign name="wifi" size={Normalize(14)} color={AppStyle.third_main_color} />
            else
                return null

        }

        return (
            kostFacilities.map((item, index) => {

                return (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon>{item.id}</Icon>
                        <Text style={{ fontSize: Normalize(12), marginRight: Normalize(10) }}>{' ' + item.name}</Text>
                    </View>
                )
            })
        )
    }

    function MappedAroundKost() {

        function Icon({ children }) {

            if (children == 0)
                return <Ionicons name="ios-basketball-outline" size={Normalize(18)} color={AppStyle.third_main_color} />
            else if (children == 1)
                return <SimpleLineIcons name="bag" size={Normalize(18)} color={AppStyle.third_main_color} />
            else if (children == 2)
                return <MaterialIcons name="shopping-basket" size={Normalize(18)} color={AppStyle.third_main_color} />
            else if (children == 3)
                return <FontAwesome name="truck" size={Normalize(18)} color={AppStyle.third_main_color} />
            else if (children == 4)
                return <MaterialIcons name="local-dining" size={Normalize(18)} color={AppStyle.third_main_color} />
            else
                return null

        }

        return (
            aroundKost.map((item, index) => {

                return (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon>{item.icon_id}</Icon>
                        <Text style={{ fontSize: Normalize(12), marginRight: Normalize(10) }}>{' ' + item.name}</Text>
                    </View>
                )
            })
        )
    }

    function MainBody() {

        return (
            <HomeBackground >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.replace('AppStack') }} style={styles.headerIcon}>
                        <AntDesign name="left" size={Normalize(24)} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Kosan Tarima</Text>
                    </View>
                </View>
                <View style={styles.headerLocation}>
                    <Text style={{ color: 'white', fontSize: Normalize(12) }} >Jakarta Selatan</Text>
                </View>
                <View style={styles.kostCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={kostPictRef}
                        data={kostCaraouselData}
                        itemWidth={AppStyle.windowSize.width}
                        sliderWidth={AppStyle.windowSize.width}
                        renderItem={_renderKostPict}
                    />
                </View>
                <View style={styles.topBorder} />
                <View style={styles.topTools}>
                    <View style={styles.toolsLeft}>
                        <TouchableOpacity style={styles.toolsButton}>
                            <Text style={styles.toolsButtonText}>Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolsButton}>
                            <Text style={styles.toolsButtonText}>Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolsButton}>
                            <Text style={styles.toolsButtonText}>360</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.toolsRight}>
                        <TouchableOpacity style={styles.toolsIcon}>
                            <Ionicons name="chatbubbles-outline" size={Normalize(18)} color={'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toolsIcon}>
                            <MaterialIcons name="favorite-outline" size={Normalize(18)} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.descContainer} >
                    <View style={styles.descTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Description</Text>
                    </View>
                    <View style={styles.descBody}>
                        <Text style={{ fontSize: Normalize(14) }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi pariatur odio aliquam error accusantium consectetur saepe maxime delectus earum corrupti labore consequatur temporibus deserunt soluta adipisci eligendi blanditiis, ab magnam?</Text>
                    </View>
                </View>
                <View style={styles.softLines} />
                <View style={styles.facilitiesContainer} >
                    <View style={styles.facilitiesTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Main Facilities</Text>
                    </View>
                    <View style={styles.facilitiesBody}>
                        <MappedFacilities />
                    </View>
                </View>
                <View style={styles.softLines} />
                <View style={styles.locationContainer} >
                    <View style={styles.locationTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Location</Text>
                    </View>
                    <View style={styles.locationBody}>
                        <MapShow />
                    </View>
                </View>
                <View style={styles.landmarkWrapper}>
                    <View style={styles.benchmarkContainer}>
                        <View style={styles.benchmarkTitle}>
                            <AntDesign name="flag" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                            <Text style={{ color: 'gray', fontSize: Normalize(18) }}>Benchmark</Text>
                        </View >
                        <View style={{ flexDirection: 'column' }}>
                            {
                                kostBenchmark.map((item, index) => {

                                    return (
                                        <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                            <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                            {'   '}
                                            <Text style={{ textAlign: 'center', fontSize: Normalize(12) }}>{item.name}</Text>
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.accessibilityContainer}>
                        <View style={styles.accessibilityTitle}>
                            <Ionicons name="ios-paper-plane-outline" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                            <Text style={{ color: 'gray', fontSize: Normalize(18) }}>Accessibility</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            {
                                kostAccessibility.map((item, index) => {

                                    return (
                                        <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                            <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                            {'   '}
                                            <Text style={{ textAlign: 'center', fontSize: Normalize(12) }}>{item.name}</Text>
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.aroundKostContainer}>
                    <View style={styles.aroundKostTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Around Kost</Text>
                    </View>
                    <View style={styles.aroundKostBody}>
                        <MappedAroundKost />
                    </View>
                </View>
                <View style={styles.softLines} />
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Rating</Text>
                    </View>
                    <View style={styles.ratingBody}>
                        <View style={styles.ratingBodyLeft}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="star" size={Normalize(24)} color="#FFB800" />
                                <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(20) }}>4.9</Text>
                            </View>
                            <Text style={{ fontSize: Normalize(16), top: 5, color: 'gray' }}>/5.0</Text>
                        </View>
                        <View style={styles.ratingBodyRight}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>4.9</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Cleanliness</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>4.9</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Convenience</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>4.9</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Security</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>4.9</Text>
                                </View>
                                <Text style={{ fontSize: Normalize(14) }}>Facilities</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewTitle}>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: Normalize(14), color: 'black', fontWeight: 'bold' }}>Review</Text>
                        </View>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: Normalize(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        reviewList.map((item, index) => {

                            if (index > 1)
                                return null

                            return (
                                <View key={index} style={styles.reviewBody}>
                                    <View style={styles.reviewBodyContainer}>
                                        <View style={styles.reviewUserPict}>
                                            <ImageBackground
                                                imageStyle={{ borderRadius: 10.12 }}
                                                style={styles.backgroundImg}
                                                source={{ uri: item.user_pict }}
                                            />
                                        </View>
                                        <View style={styles.reviewUserHeader}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <AntDesign name="star" size={Normalize(14)} color="#FFB800" style={{ marginRight: Normalize(5) }} />
                                                <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.rating}</Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', color: 'gray', fontSize: Normalize(12) }}>{item.nama_user}</Text>
                                        </View>
                                        <View style={styles.reviewUserBody}>
                                            <Text style={{ textAlign: 'left', fontSize: Normalize(12), fontWeight: 'bold' }}>
                                                {item.review_body}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>
                <View style={[styles.softLines, { top: Normalize(-40) }]} />
                <View style={styles.roomTitle}>
                    <Text style={{ fontSize: Normalize(14), color: 'black', fontWeight: 'bold' }}>Room</Text>
                </View>

                {
                    roomList.map((item, index) => {
                        return (
                            <View key={index} style={styles.roomBody}>
                                <Carousel
                                    ref={roomPictRef}
                                    layout={"default"}
                                    data={item.room_pict}
                                    renderItem={_renderRoomPict}
                                    itemWidth={AppStyle.windowSize.width * 0.9}
                                    sliderWidth={AppStyle.windowSize.width * 0.9}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(40), marginTop: Normalize(20), marginBottom: Normalize(10) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome5 name="ruler" size={Normalize(20)} color="black" style={{ marginRight: Normalize(5) }} />
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{item.room_size}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold', color: AppStyle.main_color }}>{item.room_availability > 0 ? "Available" : "unavailable"}</Text>
                                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold', color: item.room_availability > 2 ? AppStyle.success : AppStyle.error }}>{item.room_availability > 2 ? item.room_availability + " rooms" : item.room_availability + " rooms left"}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20) }}>
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: Normalize(12), color: AppStyle.fourt_main_color }}>See Details</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20), marginBottom: Normalize(20) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(16) }}>{item.room_price}</Text>
                                        </View>
                                        <Text style={{ fontSize: Normalize(14), top: 5, color: 'gray' }}>/Month</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <TouchableOpacity style={{ flexDirection: 'row', height: Normalize(25), width: Normalize(90), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: AppStyle.sub_main_color }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: Normalize(14) }}>Choose</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

                <View style={styles.softLines} />
                <View style={styles.ownerContainer}>
                    <View style={styles.ownerTitle}>
                        <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>Owner</Text>
                    </View>
                    <View style={styles.ownerBody}>
                        <View style={styles.ownerBodyContainer}>
                            <View style={styles.ownerUserPict}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: 10.12 }}
                                    style={styles.backgroundImg}
                                    source={{ uri: kostOwner.user_pict }}
                                />
                            </View>
                            <View style={styles.ownerUserHeader}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: Normalize(14), fontWeight: 'bold' }}>{kostOwner.user_name}</Text>
                                </View>
                                <Text style={{ textAlign: 'center', color: 'gray', fontSize: Normalize(12) }}>{kostOwner.location}</Text>
                            </View>
                            <View style={styles.ownerUserBody}>
                                <TouchableOpacity style={{ flexDirection: 'row', height: Normalize(40), width: Normalize(120), alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: AppStyle.third_main_color }}>
                                    <MaterialIcons name="storefront" size={Normalize(24)} color="white" style={{ marginRight: Normalize(7.5) }} />
                                    <Text style={{ textAlign: 'center', fontSize: Normalize(12), fontWeight: 'bold', color: 'white' }}>
                                        {kostOwner.kost_count} Kosan Owned
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </HomeBackground>
        )

    }

    return (
        <Tab.Navigator tabBar={props => <StickyBottom {...props} />}>
            <Tab.Screen name="MainBody" component={MainBody} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(125),
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Normalize(20),
    },
    headerIcon: {
        position: 'absolute',
        left: AppStyle.windowSize.width * 0.05,
    },
    headerLocation: {
        top: -Normalize(45),
        alignItems: 'center',
        justifyContent: 'center',
    },
    kostCarouselContainer: {
        top: -Normalize(35),
        alignSelf: 'center',
        backgroundColor: 'black',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height * 0.33,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    topBorder: {
        top: -Normalize(45),
        height: Normalize(15),
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
    },
    topTools: {
        width: '100%',
        top: -Normalize(50),
        flexDirection: 'row',
        alignItems: 'center',
        height: Normalize(35),
        justifyContent: 'flex-start',
    },
    toolsLeft: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        marginLeft: Normalize(15),
        justifyContent: 'flex-start',
    },
    toolsRight: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: -Normalize(15),
    },
    toolsButton: {
        elevation: 2,
        borderRadius: 10,
        width: Normalize(60),
        alignItems: 'center',
        height: Normalize(30),
        padding: Normalize(5),
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: Normalize(10),
    },
    toolsButtonText: {
        fontSize: Normalize(12),
    },
    toolsIcon: {
        elevation: 2,
        borderRadius: 100,
        alignItems: 'center',
        width: Normalize(34),
        height: Normalize(34),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: Normalize(10),
        borderColor: 'rgba(0,0,0,0.15)',
    },
    descContainer: {
        top: -Normalize(30),
        marginLeft: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    descTitle: {
        marginBottom: Normalize(10),
    },
    descBody: {
    },
    facilitiesContainer: {
        top: -Normalize(10),
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    facilitiesTitle: {
        marginBottom: Normalize(10),
    },
    facilitiesBody: {
        flexDirection: 'row'
    },
    softLines: {
        height: 1,
        top: -Normalize(10),
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
    },
    locationContainer: {
        top: -Normalize(10),
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    locationTitle: {
        marginBottom: Normalize(10),
    },
    locationBody: {
        flexDirection: 'row',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.2,
    },
    landmarkWrapper: {
        flexDirection: 'row',
        width: AppStyle.windowSize.width,
    },
    benchmarkContainer: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: AppStyle.windowSize.width * 0.05,
    },
    benchmarkTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Normalize(10),
    },
    verticalLine: {
        width: 1,
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    accessibilityContainer: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: AppStyle.windowSize.width * 0.05,
    },
    accessibilityTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Normalize(10),
    },
    aroundKostContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(25),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.1,
    },
    aroundKostTitle: {
        marginBottom: Normalize(10),
    },
    aroundKostBody: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    ratingContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(10),
        marginLeft: Normalize(15),
        marginBottom: Normalize(25),
        width: AppStyle.windowSize.width * 0.9,
    },
    ratingTitle: {
        marginBottom: Normalize(10),
    },
    ratingBody: {
        width: '100%',
        flexDirection: 'row',
        height: AppStyle.windowSize.height * 0.15,
    },
    ratingBodyLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ratingBodyRight: {
        width: '50%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    reviewContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: Normalize(15),
        marginBottom: Normalize(40),
        width: AppStyle.windowSize.width * 0.9,
    },
    reviewTitle: {
        marginBottom: Normalize(30),
    },
    reviewBody: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: Normalize(20),
        height: AppStyle.windowSize.height * 0.1,
    },
    reviewBodyContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    reviewUserPict: {
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    reviewUserHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    reviewUserBody: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.5,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    roomTitle: {
        top: -Normalize(30),
        left: AppStyle.windowSize.width * 0.05,
        width: AppStyle.windowSize.width * 0.9,
    },
    roomBody: {
        top: -Normalize(15),
        left: AppStyle.windowSize.width * 0.05,
        width: AppStyle.windowSize.width * 0.9,
    },
    ownerContainer: {
        marginTop: Normalize(5),
        marginLeft: Normalize(15),
        marginBottom: Normalize(100),
        width: AppStyle.windowSize.width * 0.9,
    },
    ownerTitle: {
        marginBottom: Normalize(10),
    },
    ownerBody: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: Normalize(10),
        height: AppStyle.windowSize.height * 0.1,
    },
    ownerBodyContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    ownerUserPict: {
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    ownerUserHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.2,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },
    ownerUserBody: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (AppStyle.windowSize.width * 0.9) * 0.5,
        height: (AppStyle.windowSize.width * 0.9) * 0.2,
    },

})
