import axios from 'axios';
import Icons from '../../components/Icons/icons';
import Carousel from 'react-native-snap-carousel';
import RBSheet from "react-native-raw-bottom-sheet";
import MapShow from '../../components/Maps/map_show';
import { useAxiosGet } from '../../promise/axios_get';
import { CurrencyPrefix } from '../../functions/currency';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from 'react';
import { AppStyle, KostService } from '../../config/app.config';
import withDelay from '../../components/HOC/prevent_spam_click';
import { useAxiosGetArray } from '../../promise/axios_get_array';
import { MappedFacilities } from '../../components/Icons/facilities';
import { Normalize, NormalizeFont } from '../../functions/normalize';
import SkeletonLoading from '../../components/Feedback/skeleton_loading';
import BookBackground from '../../components/Backgrounds/book_background';
import { AntDesign, Ionicons, MaterialIcons, FontAwesome5, Octicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, InteractionManager, ActivityIndicator } from 'react-native';

// a HOC to throttle button click
const TouchableOpacityPrevent = withDelay(TouchableOpacity);

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function KostDetail({ route, navigation }) {

    // get navigation parameter
    const kostID = route.params.kostID;
    const kostName = route.params.kostName;
    const kostCity = route.params.city;

    // Function refs
    const kostPictRef = useRef(null);
    const roomPictRef = useRef(null);
    const bottomSheetRef = useRef(null);
    const sheetCarouselRef = useRef(null);

    // Function Hooks
    const [isReady, setIsReady] = useState(false)

    // Global variable
    let selectedKostRoom = null

    useEffect(() => {

        // prevent update on unmounted component
        let unmounted = false;

        if (unmounted === false) {
            InteractionManager.runAfterInteractions(() => {
                setIsReady(true);
            });
        }

        return () => {
            unmounted = true;
        }
    }, [])

    function KostPictList() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/picts', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={[styles.kostCarouselContainer, { overflow: 'hidden', backgroundColor: '#ebebeb' }]}>
                    <SkeletonLoading />
                </View>
            );

        } else {

            // Carousel items
            function _renderKostPict({ item }) {

                return (
                    <ImageBackground
                        style={styles.backgroundImg}
                        source={{ uri: item.url }}
                    />
                )
            }

            return (
                <View style={styles.kostCarouselContainer}>
                    <Carousel
                        layout={"default"}
                        ref={kostPictRef}
                        data={dataArray}
                        itemWidth={AppStyle.windowSize.width}
                        sliderWidth={AppStyle.windowSize.width}
                        renderItem={_renderKostPict}
                    />
                </View>
            )
        }
    }

    function KostDescription() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { data, error } = useAxiosGet(kostAPI, '/' + kostID, 10000);

        if (data === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.descContainer} >
                    <View style={styles.descTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Description</Text>
                    </View>
                    <View style={{ height: Normalize(24), width: AppStyle.windowSize.width * 0.9, marginTop: Normalize(3), marginBottom: Normalize(3), backgroundColor: '#ebebeb', overflow: 'hidden' }}>
                        <SkeletonLoading />
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.descContainer} >
                    <View style={styles.descTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Description</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: NormalizeFont(14) }}>
                            {data.kost_desc}
                        </Text>
                    </View>
                </View>
            )
        }

    }

    function KostFacilities() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/facilities', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.facilitiesContainer} >
                    <View style={styles.facilitiesTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Main Facilities</Text>
                    </View>
                    <View style={{ height: Normalize(24), width: AppStyle.windowSize.width * 0.9, marginTop: Normalize(3), marginBottom: Normalize(3), backgroundColor: '#ebebeb', overflow: 'hidden' }}>
                        <SkeletonLoading />
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.facilitiesContainer} >
                    <View style={styles.facilitiesTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Main Facilities</Text>
                    </View>
                    <View style={styles.facilitiesBody}>
                        <MappedFacilities facilities={dataArray} category={0} />
                    </View>
                </View>
            )
        }
    }

    function KostLocation() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { data, error } = useAxiosGet(kostAPI, '/' + kostID, 10000);

        if (data === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.locationContainer} >
                    <View style={styles.locationTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Location</Text>
                    </View>
                    <View style={[styles.locationBody, { backgroundColor: '#ebebeb', overflow: 'hidden' }]}>
                        <SkeletonLoading />
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.locationContainer} >
                    <View style={styles.locationTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Location</Text>
                    </View>
                    <View style={styles.locationBody}>
                        <MapShow latitude={data.latitude} longitude={data.longitude} />
                    </View>
                </View>
            )
        }
    }

    function KostBenchmark() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/benchmark', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.benchmarkContainer}>
                    <View style={styles.benchmarkTitle}>
                        <AntDesign name="flag" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                        <Text style={{ color: 'gray', fontSize: NormalizeFont(18) }}>Benchmark</Text>
                    </View >
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ height: Normalize(24), width: AppStyle.windowSize.width * 0.4, marginTop: Normalize(3), marginBottom: Normalize(3), backgroundColor: '#ebebeb', overflow: 'hidden' }}>
                            <SkeletonLoading />
                        </View>
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.benchmarkContainer}>
                    <View style={styles.benchmarkTitle}>
                        <AntDesign name="flag" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                        <Text style={{ color: 'gray', fontSize: NormalizeFont(18) }}>Benchmark</Text>
                    </View >
                    <View style={{ flexDirection: 'column' }}>
                        {
                            dataArray.map((item, index) => {
                                return (
                                    <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                        {'   '}
                                        <Text style={{ textAlign: 'center', fontSize: NormalizeFont(12) }}>{item.benchmark_desc}</Text>
                                    </Text>
                                )
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    function KostAccessibility() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/access', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.accessibilityContainer}>
                    <View style={styles.accessibilityTitle}>
                        <Ionicons name="ios-paper-plane-outline" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                        <Text style={{ color: 'gray', fontSize: NormalizeFont(18) }}>Accessibility</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ height: Normalize(24), width: AppStyle.windowSize.width * 0.4, marginTop: Normalize(3), marginBottom: Normalize(3), backgroundColor: '#ebebeb', overflow: 'hidden' }}>
                            <SkeletonLoading />
                        </View>
                    </View>
                </View>
            );

        } else {
            return (
                <View style={styles.accessibilityContainer}>
                    <View style={styles.accessibilityTitle}>
                        <Ionicons name="ios-paper-plane-outline" size={Normalize(24)} color="gray" style={{ marginRight: Normalize(10) }} />
                        <Text style={{ color: 'gray', fontSize: NormalizeFont(18) }}>Accessibility</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        {
                            dataArray.map((item, index) => {

                                return (
                                    <Text key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Octicons name="primitive-dot" size={Normalize(12)} color="black" />
                                        {'   '}
                                        <Text style={{ textAlign: 'center', fontSize: NormalizeFont(12) }}>{item.accessibility_desc}</Text>
                                    </Text>
                                )
                            })
                        }
                    </View>
                </View>
            )
        }
    }
    function KostAround() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/around', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.aroundKostContainer}>
                    <View style={styles.aroundKostTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Around Kost</Text>
                    </View>
                    <View style={styles.aroundKostBody}>
                        <View style={{ height: Normalize(24), width: AppStyle.windowSize.width * 0.9, marginTop: Normalize(3), marginBottom: Normalize(3), backgroundColor: '#ebebeb', overflow: 'hidden' }}>
                            <SkeletonLoading />
                        </View>
                    </View>
                </View>
            );

        } else {
            function MappedAroundKost() {
                return (
                    dataArray.map((item, index) => {

                        return (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Icons IconID={item.icon_id} />
                                <Text style={{ fontSize: NormalizeFont(12), marginRight: Normalize(10) }}>{' ' + item.around_desc}</Text>
                            </View>
                        )
                    })
                )
            }

            return (
                <View style={styles.aroundKostContainer}>
                    <View style={styles.aroundKostTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Around Kost</Text>
                    </View>
                    <View style={styles.aroundKostBody}>
                        <MappedAroundKost />
                    </View>
                </View>
            )
        }
    }

    function KostRating() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/review', 10000);

        var cleanliness = 0
        var convenience = 0
        var security = 0
        var facilities = 0
        var avgTotal = 0

        if (dataArray === null || error) {

            //TODO: add filter response status to determine the dataArray null value before and after the response

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Rating</Text>
                    </View>
                    <View style={styles.ratingBody}>
                        <View style={styles.ratingBodyLeft}>
                            <View style={{ flexDirection: 'row', height: Normalize(24), width: AppStyle.windowSize.width * 0.4, overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                        <View style={styles.ratingBodyRight}>
                            <View style={{ flexDirection: 'row', height: Normalize(24 * 4), marginTop: Normalize(3), marginBottom: Normalize(3), width: AppStyle.windowSize.width * 0.4, overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                </View>
            );

        } else {

            if (dataArray.length !== 0) {
                dataArray.forEach(element => {
                    cleanliness += element.cleanliness
                    convenience += element.convenience
                    security += element.security
                    facilities += element.facilities
                });

                avgTotal = ((cleanliness / dataArray.length) + (convenience / dataArray.length) + (security / dataArray.length) + (facilities / dataArray.length)) / 4
            }

            return (
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Rating</Text>
                    </View>
                    <View style={styles.ratingBody}>
                        <View style={styles.ratingBodyLeft}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="star" size={Normalize(24)} color="#FFB800" />
                                <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(20) }}>{avgTotal.toString().substring(0, 3)}</Text>
                            </View>
                            <Text style={{ fontSize: NormalizeFont(16), top: 5, color: 'gray' }}>/5.0</Text>
                        </View>
                        <View style={styles.ratingBodyRight}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(14) }}>{(cleanliness / dataArray.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: NormalizeFont(14) }}>Cleanliness</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(14) }}>{(convenience / dataArray.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: NormalizeFont(14) }}>Convenience</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(14) }}>{(security / dataArray.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: NormalizeFont(14) }}>Security</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', marginRight: Normalize(10) }}>
                                    <AntDesign name="star" size={Normalize(14)} color="#FFB800" />
                                    <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(14) }}>{(facilities / dataArray.length).toString().substring(0, 3)}</Text>
                                </View>
                                <Text style={{ fontSize: NormalizeFont(14) }}>Facilities</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    function KostReview() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/review', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewTitle}>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: NormalizeFont(14), color: 'black', fontWeight: 'bold' }}>Review</Text>
                        </View>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacityPrevent>
                                <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacityPrevent>
                        </View>
                    </View>
                    <View style={styles.reviewBody}>
                        <View style={styles.reviewBodyContainer}>
                            <View style={[styles.reviewUserPict, { overflow: 'hidden', backgroundColor: '#ebebeb', borderRadius: Normalize(10.12) }]}>
                                <SkeletonLoading />
                            </View>
                            <View style={[styles.reviewUserHeader, { overflow: 'hidden', backgroundColor: '#ebebeb', borderRadius: Normalize(10.12) }]}>
                                <SkeletonLoading />
                            </View>
                            <View style={[styles.reviewUserBody, { overflow: 'hidden', backgroundColor: '#ebebeb', borderRadius: Normalize(10.12) }]}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                </View>
            )

        }
        else {
            return (
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewTitle}>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: NormalizeFont(14), color: 'black', fontWeight: 'bold' }}>Review</Text>
                        </View>
                        <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacityPrevent>
                                <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.sub_main_color, fontWeight: 'bold' }}>See All</Text>
                            </TouchableOpacityPrevent>
                        </View>
                    </View>
                    {
                        dataArray.map((item, index) => {

                            var avgTotal = (item.cleanliness + item.convenience + item.security + item.facilities) / 4

                            if (index > 1)
                                return null

                            return (
                                <View key={index} style={styles.reviewBody}>
                                    <View style={styles.reviewBodyContainer}>
                                        <View style={styles.reviewUserPict}>
                                            <ImageBackground
                                                imageStyle={{ borderRadius: Normalize(10.12) }}
                                                style={styles.backgroundImg}
                                                source={{ uri: item.profile_picture }}
                                            />
                                        </View>
                                        <View style={styles.reviewUserHeader}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <AntDesign name="star" size={Normalize(14)} color="#FFB800" style={{ marginRight: Normalize(5) }} />
                                                <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{avgTotal.toString().substring(0, 3)}</Text>
                                            </View>
                                            <Text style={{ textAlign: 'center', color: 'gray', fontSize: NormalizeFont(12) }}>{item.display_name}</Text>
                                        </View>
                                        <View style={styles.reviewUserBody}>
                                            <Text style={{ textAlign: 'left', fontSize: NormalizeFont(12), fontWeight: 'bold' }}>
                                                {item.comments}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            )
        }
    }

    function KostRooms() {

        // Skeleton Placeholder Function
        function RoomSkeleton() {
            return (
                <View style={styles.roomBody}>
                    <View style={{ width: AppStyle.windowSize.width * 0.9, height: AppStyle.windowSize.height * 0.2, overflow: 'hidden', backgroundColor: '#ebebeb', borderRadius: Normalize(10) }}>
                        <SkeletonLoading />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(40), marginTop: Normalize(20), marginBottom: Normalize(10) }}>
                        <View style={{ flexDirection: 'row', width: AppStyle.windowSize.width * 0.33, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                            <SkeletonLoading />
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <View style={{ width: AppStyle.windowSize.width * 0.33, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                <SkeletonLoading />
                            </View>
                            <View style={{ width: AppStyle.windowSize.width * 0.33, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20) }}>
                        <TouchableOpacity style={{ width: AppStyle.windowSize.width * 0.25, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                            <SkeletonLoading />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20), marginBottom: Normalize(20) }}>
                        <View style={{ flexDirection: 'row', width: AppStyle.windowSize.width * 0.33, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                            <SkeletonLoading />
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <View style={{ width: AppStyle.windowSize.width * 0.33, height: Normalize(24), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                </View>
            )
        }

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + kostID + '/rooms', 10000);

        if (dataArray === null || error) {

            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <>
                    <View style={styles.roomTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), color: 'black', fontWeight: 'bold' }}>Room</Text>
                    </View>
                    <RoomSkeleton />
                </>
            )

        } else {

            function KostRoomList(props) {

                // Function Hooks
                const [flag, setFlag] = useState(0)

                // Get the data via axios get request
                const { data, error } = useAxiosGet(kostAPI, '/' + kostID + '/rooms/' + props.kostRoom.id + '/details', 10000);

                if (data === null || error) {

                    if (error) {
                        if (flag < 10) {
                            setTimeout(() => {
                                setFlag(flag + 1)
                            }, 2000);
                        }
                    }

                    return (
                        <RoomSkeleton />
                    )

                } else {

                    function RoomPicts(props) {

                        function _renderRoomPict({ item }) {

                            return (
                                <ImageBackground
                                    imageStyle={{ borderRadius: Normalize(10) }}
                                    style={[styles.backgroundImg, { height: AppStyle.windowSize.height * 0.2 }]}
                                    source={{ uri: item.url }}
                                />
                            )
                        }

                        return (
                            <Carousel
                                ref={roomPictRef}
                                layout={"default"}
                                data={props.RoomPicts}
                                renderItem={_renderRoomPict}
                                itemWidth={AppStyle.windowSize.width * 0.9}
                                sliderWidth={AppStyle.windowSize.width * 0.9}
                            />
                        )
                    }

                    var roomBookedCount = 0
                    if (data.room_booked !== null) {
                        roomBookedCount = data.room_booked.length
                    }

                    var roomAvailability = data.room_details.length - roomBookedCount

                    return (
                        <View style={styles.roomBody}>
                            <RoomPicts RoomPicts={data.room_picts} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(40), marginTop: Normalize(20), marginBottom: Normalize(10) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome5 name="ruler" size={Normalize(20)} color="black" style={{ marginRight: Normalize(5) }} />
                                    <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{props.kostRoom.room_length + props.kostRoom.room_area_uom_desc.substring(0, 1) + ' x ' + props.kostRoom.room_width + props.kostRoom.room_area_uom_desc.substring(0, 1)}</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: AppStyle.main_color }}>{roomAvailability > 0 ? "Available" : "unavailable"}</Text>
                                    <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold', color: roomAvailability > 2 ? AppStyle.success : AppStyle.error }}>{roomAvailability > 2 ? roomAvailability + " rooms" : roomAvailability < 2 ? roomAvailability + " room left" : roomAvailability + " rooms left"}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20) }}>
                                <TouchableOpacityPrevent onPress={() => {
                                    selectedKostRoom = props.kostRoom;
                                    bottomSheetRef.current.open();
                                }}>
                                    <Text style={{ fontSize: NormalizeFont(12), color: AppStyle.fourt_main_color }}>See Details</Text>
                                </TouchableOpacityPrevent>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: Normalize(20), marginBottom: Normalize(20) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(16) }}>{CurrencyPrefix(props.kostRoom.room_price_uom_desc) + props.kostRoom.room_price}</Text>
                                    </View>
                                    <Text style={{ fontSize: NormalizeFont(14), top: 5, color: 'gray' }}>/Month</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <TouchableOpacityPrevent onPress={() => {
                                        navigation.push('RoomSelection', {
                                            room: selectedKostRoom,
                                            roomDetails: data,
                                        });
                                    }} style={{ flexDirection: 'row', height: Normalize(25), width: Normalize(90), justifyContent: 'center', alignItems: 'center', borderRadius: Normalize(10), backgroundColor: AppStyle.sub_main_color }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Choose</Text>
                                    </TouchableOpacityPrevent>
                                </View>
                            </View>
                        </View>
                    )
                }

            }

            return (
                <>
                    <View style={styles.roomTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), color: 'black', fontWeight: 'bold' }}>Room</Text>
                    </View>
                    {
                        dataArray.map((item, index) => {
                            return (
                                <KostRoomList key={index} kostRoom={item} />
                            )
                        })
                    }
                </>
            )
        }
    }

    function KostOwner() {

        // Function Hooks
        const [flag, setFlag] = useState(0)

        // Get the data via axios get request
        const { data, error } = useAxiosGet(kostAPI, '/' + kostID + '/owner', 10000);

        if (data === null || error) {
            if (error) {
                if (flag < 10) {
                    setTimeout(() => {
                        setFlag(flag + 1)
                    }, 2000);
                }
            }

            return (
                <View style={styles.ownerContainer}>
                    <View style={styles.ownerTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Owner</Text>
                    </View>
                    <View style={styles.ownerBody}>
                        <View style={styles.ownerBodyContainer}>
                            <View style={[styles.ownerUserPict, { overflow: 'hidden', backgroundColor: '#ebebeb' }]}>
                                <SkeletonLoading />
                            </View>
                            <View style={styles.ownerUserHeader}>
                                <View style={{ width: AppStyle.windowSize.width * 0.2, height: Normalize(24), marginBottom: Normalize(3), marginTop: Normalize(3), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                    <SkeletonLoading />
                                </View>
                                <View style={{ width: AppStyle.windowSize.width * 0.2, height: Normalize(24), marginBottom: Normalize(3), marginTop: Normalize(3), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                    <SkeletonLoading />
                                </View>
                            </View>
                            <View style={styles.ownerUserBody}>
                                <View style={{ flexDirection: 'row', height: Normalize(40), width: Normalize(120), alignSelf: 'flex-end', borderRadius: Normalize(10), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                                    <SkeletonLoading />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.ownerContainer}>
                    <View style={styles.ownerTitle}>
                        <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Owner</Text>
                    </View>
                    <View style={styles.ownerBody}>
                        <View style={styles.ownerBodyContainer}>
                            <View style={styles.ownerUserPict}>
                                <ImageBackground
                                    imageStyle={{ borderRadius: Normalize(10.12) }}
                                    style={styles.backgroundImg}
                                    source={{ uri: data.profile_picture }}
                                />
                            </View>
                            <View style={styles.ownerUserHeader}>
                                <Text style={{ textAlign: 'center', fontSize: NormalizeFont(14), fontWeight: 'bold' }}>{data.display_name}</Text>
                                <Text style={{ textAlign: 'center', color: 'gray', fontSize: NormalizeFont(12) }}>{data.city}</Text>
                            </View>
                            <View style={styles.ownerUserBody}>
                                <TouchableOpacityPrevent style={{ flexDirection: 'row', padding: Normalize(10), alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: Normalize(10), backgroundColor: AppStyle.third_main_color }}>
                                    <MaterialIcons name="storefront" size={Normalize(24)} color="white" style={{ marginRight: Normalize(7.5) }} />
                                    <Text style={{ textAlign: 'center', fontSize: NormalizeFont(12), fontWeight: 'bold', color: 'white' }}>{data.kost_list.length} Kosan Owned</Text>
                                </TouchableOpacityPrevent>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }

    function KostBottomSheet() {

        // Function state
        var [kostRoomDetails, setKostRoomDetails] = useState(null)
        var [kostFacilities, setKostFacilities] = useState(null)

        // triggers when the bottom sheet starts opening
        function _getRoomData() {
            if (selectedKostRoom !== null) {

                // creates the cancel token source
                var cancelSource = axios.CancelToken.source()

                axios.all([
                    kostAPI.get('/' + kostID + '/rooms/' + selectedKostRoom.id + '/details', {
                        cancelToken: cancelSource.token
                    }).catch(error => {
                        //TODO: Development only console.log
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                console.log(error)
                            }
                        }
                    }),
                    kostAPI.get('/' + kostID + '/facilities/room/' + selectedKostRoom.id, {
                        cancelToken: cancelSource.token
                    }).catch(error => {
                        //TODO: Development only console.log
                        if (typeof (error.response) !== 'undefined') {
                            if (!axios.isCancel(error)) {
                                console.log(error)
                            }
                        }
                    })
                ])
                    .then(responseArr => {
                        setKostRoomDetails(responseArr[0].data)
                        setKostFacilities(responseArr[1].data)
                    })
                    .catch((err) => {
                        if (typeof (err.response) !== 'undefined') {
                            if (!axios.isCancel(err)) {
                                console.log(err)
                            }
                        }
                    });

            }
        }

        function KostSheetPicts() {

            function _renderSheetRoomPicts({ item }) {

                return (
                    <ImageBackground
                        imageStyle={{ borderRadius: Normalize(10) }}
                        style={[styles.backgroundImg]}
                        source={{ uri: item.url }}
                    />
                )
            }

            if (kostRoomDetails === null) {
                return (
                    <View style={[styles.sheetCarouselContainer, { backgroundColor: '#ebebeb', overflow: 'hidden' }]}>
                        <SkeletonLoading />
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetCarouselContainer}>
                        <Carousel
                            layout={"default"}
                            ref={sheetCarouselRef}
                            data={kostRoomDetails.room_picts}
                            itemWidth={AppStyle.windowSize.width * 0.9}
                            sliderWidth={AppStyle.windowSize.width * 0.9}
                            renderItem={_renderSheetRoomPicts}
                        />
                    </View>
                )
            }

        }

        function KostSheetTitle() {

            if (kostRoomDetails === null) {
                return (
                    <View style={styles.sheetRoomTitle}>
                        <View style={{ width: AppStyle.windowSize.width * 0.5, height: Normalize(24), marginBottom: Normalize(3), marginTop: Normalize(3), overflow: 'hidden', backgroundColor: '#ebebeb' }}>
                            <SkeletonLoading />
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetRoomTitle}>
                        <Text style={{ fontSize: NormalizeFont(18), fontWeight: 'bold' }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.room_desc}</Text>
                    </View>
                )
            }

        }

        function KostSheetTopInfoLeft() {

            if (kostRoomDetails === null) {
                return (
                    <View style={[styles.sheetTopInfoLeft, { backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.425 }]}>
                        <SkeletonLoading />
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetTopInfoLeft}>
                        <View style={styles.sheetTopInfoLeftItem}>
                            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="ruler" size={Normalize(24)} color="black" />
                                </View>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Size</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.room_length + selectedKostRoom.room_area_uom_desc.substring(0, 1) + ' x ' + selectedKostRoom.room_width + selectedKostRoom.room_area_uom_desc.substring(0, 1)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.sheetTopInfoLeftItem}>
                            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialIcons name="people-outline" size={Normalize(24)} color="black" />
                                </View>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(14) }}>Guest</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', height: '50%', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <View style={{ height: '100%', width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: NormalizeFont(12) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : (selectedKostRoom.max_person > 1 ? selectedKostRoom.max_person + " Person" : selectedKostRoom.max_person + " Persons")}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }

        }

        function KostSheetTopInfoRight(props) {

            function GenderFilter() {

                if (selectedKostRoom === null || kostRoomDetails === null) {
                    return null
                } else {

                    if (selectedKostRoom.allowed_gender === "Male") {
                        return (
                            <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.male_color, borderRadius: Normalize(10) }}>
                                <Ionicons name="male" size={Normalize(24)} color="white" />
                                <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>Male</Text>
                            </View>
                        )
                    }
                    else if (selectedKostRoom.allowed_gender === "Female") {
                        return (
                            <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.female_color, borderRadius: Normalize(10) }}>
                                <Ionicons name="female" size={Normalize(24)} color="white" />
                                <Text style={{ color: 'white', fontSize: NormalizeFont(14) }}>Female</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.male_color, borderRadius: Normalize(10), marginRight: Normalize(5) }}>
                                    <Ionicons name="female" size={Normalize(18)} color="white" />
                                    <Text style={{ color: 'white', fontSize: NormalizeFont(12) }}>Male</Text>
                                </View>
                                <View style={{ flexDirection: 'row', height: Normalize(35), padding: Normalize(10), justifyContent: 'center', alignItems: 'center', backgroundColor: AppStyle.female_color, borderRadius: Normalize(10) }}>
                                    <Ionicons name="female" size={Normalize(18)} color="white" />
                                    <Text style={{ color: 'white', fontSize: NormalizeFont(12) }}>Female</Text>
                                </View>
                            </View>
                        )
                    }

                }
            }

            if (kostRoomDetails === null) {
                return (
                    <View style={[styles.sheetTopInfoRight, { backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.425 }]}>
                        <SkeletonLoading />
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetTopInfoRight}>
                        <View style={styles.sheetTopInfoRightItem}>
                            <GenderFilter />
                        </View>
                        <View style={styles.sheetTopInfoRightItem}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: AppStyle.main_color, fontSize: NormalizeFont(14) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : (props.roomAvailability > 0 ? "Available" : "Unavailable")}</Text>
                                <Text style={{ color: props.roomAvailability > 2 ? AppStyle.success : AppStyle.error, fontSize: NormalizeFont(12) }}> {selectedKostRoom === null || kostRoomDetails === null ? "" : (props.roomAvailability > 2 ? props.roomAvailability + " rooms" : (props.roomAvailability < 2 ? props.roomAvailability + " room left" : props.roomAvailability + " rooms left"))}</Text>
                            </View>
                        </View>
                    </View>
                )
            }

        }

        function KostSheetSharingFacility() {

            if (kostRoomDetails === null || kostFacilities === null) {
                return (
                    <View style={styles.sheetSharingFac}>
                        <View style={styles.sheetSharingFacTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Sharing Facilities</Text>
                        </View>
                        <View style={styles.sheetSharingFacBody}>
                            <View style={{ backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.9, height: Normalize(24) }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetSharingFac}>
                        <View style={styles.sheetSharingFacTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Sharing Facilities</Text>
                        </View>
                        <View style={styles.sheetSharingFacBody}>
                            <MappedFacilities facilities={kostFacilities} category={1} />
                        </View>
                    </View>
                )
            }

        }

        function KostSheetRoomFacility() {

            if (kostRoomDetails === null || kostFacilities === null) {
                return (
                    <View style={styles.sheetRoomFac}>
                        <View style={styles.sheetRoomFacTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Sharing Facilities</Text>
                        </View>
                        <View style={styles.sheetRoomFacBody}>
                            <View style={{ backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.9, height: Normalize(24) }}>
                                <SkeletonLoading />
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetRoomFac}>
                        <View style={styles.sheetRoomFacTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Room Facilities</Text>
                        </View>
                        <View style={styles.sheetRoomFacBody}>
                            <MappedFacilities facilities={kostFacilities} category={2} />
                        </View>
                    </View>
                )
            }

        }

        function KostSheetNotes() {

            let SkeletonPlaceholder = [0, 1, 2]

            if (kostRoomDetails === null) {
                return (
                    <View style={styles.sheetNotes}>
                        <View style={styles.sheetNotesTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Sharing Facilities</Text>
                        </View>
                        <View style={styles.sheetNotesBody}>
                            {
                                SkeletonPlaceholder.map((item, index) => {
                                    return (
                                        <View key={index} style={{ backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.9, height: Normalize(24), marginBottom: Normalize(3), marginTop: Normalize(3) }}>
                                            <SkeletonLoading />
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.sheetNotes}>
                        <View style={styles.sheetNotesTitle}>
                            <Text style={{ fontSize: NormalizeFont(14), fontWeight: 'bold' }}>Notes</Text>
                        </View>
                        <View style={styles.sheetNotesBody}>
                            <Text style={{ fontSize: NormalizeFont(14) }}>
                                {selectedKostRoom === null || kostRoomDetails === null ? "" : selectedKostRoom.comments}
                            </Text>
                        </View>
                    </View>
                )
            }

        }

        function KostSheetPriceTag() {

            if (kostRoomDetails === null) {
                return (
                    <View style={styles.priceTag}>
                        <View style={{ backgroundColor: '#ebebeb', overflow: 'hidden', width: AppStyle.windowSize.width * 0.45, height: Normalize(24) }}>
                            <SkeletonLoading />
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.priceTag}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: Normalize(5), fontSize: NormalizeFont(16) }}>{selectedKostRoom === null || kostRoomDetails === null ? "" : CurrencyPrefix(selectedKostRoom.room_price_uom_desc) + selectedKostRoom.room_price}</Text>
                        </View>
                        <Text style={{ fontSize: NormalizeFont(14), top: 5, color: 'gray' }}>/ Month</Text>
                    </View>
                )
            }

        }

        function SheetBody() {

            var roomBookedCount = 0
            var roomAvailability = 0
            if (selectedKostRoom !== null) {
                if (kostRoomDetails !== null) {
                    if (kostRoomDetails.room_booked !== null) {
                        roomBookedCount = kostRoomDetails.room_booked.length
                    }
                    roomAvailability = kostRoomDetails.room_details.length - roomBookedCount
                }
            }

            return (
                <>
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                        <KostSheetPicts />
                        <KostSheetTitle />
                        <View style={styles.sheetTopInfo}>
                            <KostSheetTopInfoLeft />
                            <KostSheetTopInfoRight roomAvailability={roomAvailability} />
                        </View>
                        <KostSheetSharingFacility />
                        <KostSheetRoomFacility />
                        <KostSheetNotes />
                    </ScrollView>
                    <View style={styles.stickyContainer}>
                        <KostSheetPriceTag />
                        <TouchableOpacityPrevent onPress={() => {
                            bottomSheetRef.current.close();
                            navigation.push('RoomSelection', {
                                room: selectedKostRoom,
                                roomDetails: kostRoomDetails,
                            });
                        }} style={styles.bookButton}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: NormalizeFont(14) }}>Book Now</Text>
                        </TouchableOpacityPrevent>
                    </View>
                </>
            )
        }
        return (
            <RBSheet
                ref={bottomSheetRef}
                animationType={"slide"}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                closeOnPressMask={false}
                onOpen={() => { _getRoomData() }}
                onClose={() => {
                    setKostRoomDetails(null)
                    setKostFacilities(null)
                    selectedKostRoom = null
                }}
                height={AppStyle.screenSize.height * 0.85}
                openDuration={1000}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    container: {
                        height: AppStyle.windowSize.height * 0.85
                    },
                    draggableIcon: {
                        backgroundColor: "gray"
                    },
                }}
            >
                <SheetBody />
            </RBSheet>
        );
    }

    if (isReady === false) {
        // loading screen
        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ fontSize: NormalizeFont(12) }}>Loading Kost...</Text>
            </View>
        )
    } else {
        return (
            //TODO: create function to Prevent double click on navigation, test the leaking memory problem with double click
            <>
                <BookBackground >
                    <View style={styles.header}>
                        <TouchableOpacityPrevent onPress={() => {
                            navigation.pop()
                        }} style={styles.headerIcon}>
                            <AntDesign name="left" size={Normalize(24)} color="white" />
                        </TouchableOpacityPrevent>
                        <View>
                            <Text style={styles.headerText}>{kostName}</Text>
                        </View>
                    </View>
                    <View style={styles.headerLocation}>
                        <Text style={{ color: 'white', fontSize: NormalizeFont(12) }} >{kostCity}</Text>
                    </View>
                    <KostPictList />
                    <View style={styles.topBorder} />
                    <View style={styles.topTools}>
                        <View style={styles.toolsLeft}>
                            <TouchableOpacityPrevent style={styles.toolsButton}>
                                <Text style={styles.toolsButtonText}>Photo</Text>
                            </TouchableOpacityPrevent>
                            <TouchableOpacityPrevent style={styles.toolsButton}>
                                <Text style={styles.toolsButtonText}>Video</Text>
                            </TouchableOpacityPrevent>
                            <TouchableOpacityPrevent style={styles.toolsButton}>
                                <Text style={styles.toolsButtonText}>360</Text>
                            </TouchableOpacityPrevent>
                        </View>
                        <View style={styles.toolsRight}>
                            <TouchableOpacityPrevent style={styles.toolsIcon}>
                                <Ionicons name="chatbubbles-outline" size={Normalize(18)} color={'black'} />
                            </TouchableOpacityPrevent>
                            <TouchableOpacityPrevent style={styles.toolsIcon}>
                                <MaterialIcons name="favorite-outline" size={Normalize(18)} color="red" />
                            </TouchableOpacityPrevent>
                        </View>
                    </View>
                    <KostDescription />
                    <View style={styles.softLines} />
                    <KostFacilities />
                    <View style={styles.softLines} />
                    <KostLocation />
                    <View style={styles.landmarkWrapper}>
                        <KostBenchmark />
                        <View style={styles.verticalLine} />
                        <KostAccessibility />
                    </View>
                    <KostAround />
                    <View style={styles.softLines} />
                    <KostRating />
                    <KostReview />
                    <View style={[styles.softLines, { top: Normalize(-40) }]} />
                    <KostRooms />
                    <View style={styles.softLines} />
                    <KostOwner />
                </BookBackground>
                <KostBottomSheet />
            </>
        )
    }
}

const styles = StyleSheet.create({

    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        fontSize: NormalizeFont(20),
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
        backgroundColor: 'white',
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
        width: Normalize(60),
        alignItems: 'center',
        height: Normalize(30),
        padding: Normalize(5),
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: Normalize(10),
        borderRadius: Normalize(10),
    },
    toolsButtonText: {
        fontSize: NormalizeFont(12),
    },
    toolsIcon: {
        elevation: 2,
        alignItems: 'center',
        width: Normalize(34),
        height: Normalize(34),
        backgroundColor: 'white',
        justifyContent: 'center',
        marginLeft: Normalize(10),
        borderRadius: Normalize(100),
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
        flexWrap: 'wrap',
        flexDirection: 'row',
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        marginBottom: Normalize(20),
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
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopLeftRadius: Normalize(10),
        borderTopRightRadius: Normalize(10),
        height: AppStyle.windowSize.height * 0.05,
    },
    sheetCarouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.2,
    },
    sheetRoomTitle: {
        width: '100%',
        alignItems: 'center',
        marginTop: Normalize(15),
        justifyContent: 'center',
    },
    sheetTopInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Normalize(20),
        justifyContent: 'space-between',
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.15,
    },
    sheetTopInfoLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sheetTopInfoLeftItem: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        borderRightWidth: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.25)'
    },
    sheetTopInfoRight: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sheetTopInfoRightItem: {
        width: '100%',
        height: '50%',
        borderLeftWidth: 0.5,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,0.25)'
    },
    sheetSharingFac: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    sheetSharingFacTitle: {
        marginBottom: Normalize(10),
    },
    sheetSharingFacBody: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Normalize(5),
        justifyContent: 'space-evenly',
    },
    sheetRoomFac: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(10),
        width: AppStyle.windowSize.width * 0.9,
        height: AppStyle.windowSize.height * 0.1,
    },
    sheetRoomFacTitle: {
        marginBottom: Normalize(10),
    },
    sheetRoomFacBody: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Normalize(5),
        justifyContent: 'space-evenly',
    },
    sheetNotes: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: Normalize(10),
        marginBottom: Normalize(15),
        width: AppStyle.windowSize.width * 0.9,
    },
    sheetNotesTitle: {
        marginBottom: Normalize(10),
    },
    sheetNotesBody: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickyContainer: {
        elevation: 10,
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.width * 0.15,
    },
    priceTag: {
        flexDirection: 'row',
        marginLeft: AppStyle.screenSize.width * 0.05,
    },
    bookButton: {
        alignItems: 'center',
        height: Normalize(35),
        width: Normalize(108),
        justifyContent: 'center',
        borderRadius: Normalize(20),
        backgroundColor: AppStyle.sub_main_color,
        marginRight: AppStyle.screenSize.width * 0.05,
    },

})
