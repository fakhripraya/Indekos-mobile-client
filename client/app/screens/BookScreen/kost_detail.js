import React, { useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import MapShow from '../../components/Maps/map_show';
import { AppStyle, Normalize } from '../../config/app.config';
import HomeBackground from '../../components/Backgrounds/book_background';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome, SimpleLineIcons, Octicons } from '@expo/vector-icons';

export default function KostDetail({ navigation }) {

    // Function refs
    const kostPictRef = useRef(null);

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


    function _renderKostPict({ item }) {

        return (

            <ImageBackground
                style={styles.backgroundImg}
                source={{ uri: item.uri }}
            />
        )
    }

    function MappedFacilities() {

        function Icon({ children }) {

            if (children == 0)
                return <FontAwesome name="snowflake-o" size={Normalize(12)} color={AppStyle.third_main_color} />
            else if (children == 1)
                return <MaterialIcons name="storefront" size={Normalize(12)} color={AppStyle.third_main_color} />
            else if (children == 2)
                return <AntDesign name="unlock" size={Normalize(12)} color={AppStyle.third_main_color} />
            else if (children == 3)
                return <AntDesign name="wifi" size={Normalize(12)} color={AppStyle.third_main_color} />
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
                return <Ionicons name="ios-basketball-outline" size={24} color={AppStyle.third_main_color} />
            else if (children == 1)
                return <SimpleLineIcons name="bag" size={24} color={AppStyle.third_main_color} />
            else if (children == 2)
                return <MaterialIcons name="shopping-basket" size={24} color={AppStyle.third_main_color} />
            else if (children == 3)
                return <FontAwesome name="truck" size={24} color={AppStyle.third_main_color} />
            else if (children == 4)
                return <MaterialIcons name="local-dining" size={24} color={AppStyle.third_main_color} />
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
                    itemWidth={AppStyle.screenSize.width}
                    sliderWidth={AppStyle.screenSize.width}
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
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi pariatur odio aliquam error accusantium consectetur saepe maxime delectus earum corrupti labore consequatur temporibus deserunt soluta adipisci eligendi blanditiis, ab magnam?</Text>
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
                        <Text style={{ color: 'gray' }}>Benchmark</Text>
                    </View >
                    <View style={{ flexDirection: 'column' }}>
                        {
                            kostBenchmark.map((item, index) => {

                                return (
                                    <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                        {'  '}
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
                        <Text style={{ color: 'gray' }}>Accessibility</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        {
                            kostAccessibility.map((item, index) => {

                                return (
                                    <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                        {'  '}
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
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                <Text style={{ marginLeft: Normalize(5), fontSize: Normalize(14) }}>4.9</Text>
                            </View>
                            <Text style={{ fontSize: Normalize(14) }}>Cleanliness</Text>
                        </View>
                    </View>
                </View>
            </View>
        </HomeBackground>
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
        left: AppStyle.screenSize.width * 0.05,
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
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.33,
    },
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    topBorder: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
        top: -Normalize(45),
        height: Normalize(15)
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
        fontSize: Normalize(12)
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
        width: AppStyle.screenSize.width * 0.9,
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
        width: AppStyle.screenSize.width * 0.9,
    },
    facilitiesTitle: {
        marginBottom: Normalize(10),
    },
    facilitiesBody: {
        flexDirection: 'row'
    },
    softLines: {
        top: -Normalize(10),
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: AppStyle.screenSize.width * 0.9,
        left: AppStyle.screenSize.width * 0.05,
    },
    locationContainer: {
        top: -Normalize(10),
        marginTop: Normalize(15),
        marginLeft: Normalize(15),
        marginBottom: Normalize(15),
        width: AppStyle.screenSize.width * 0.9,
    },
    locationTitle: {
        marginBottom: Normalize(10),
    },
    locationBody: {
        flexDirection: 'row',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.2,
    },
    landmarkWrapper: {
        flexDirection: 'row',
        width: AppStyle.screenSize.width,
    },
    benchmarkContainer: {
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: AppStyle.screenSize.width * 0.05,
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
        left: AppStyle.screenSize.width * 0.05,
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
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.1,
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
        width: AppStyle.screenSize.width * 0.9,
    },
    ratingTitle: {
        marginBottom: Normalize(10),
    },
    ratingBody: {
        width: '100%',
        flexDirection: 'row',
        height: AppStyle.screenSize.height * 0.15,
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
        justifyContent: 'center',
    },

})
