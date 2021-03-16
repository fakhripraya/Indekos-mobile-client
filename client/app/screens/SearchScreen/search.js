import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import React, { useRef, useState, useEffect } from 'react';
import { useAxiosGetArray } from '../../promise/axios_get_array';
import { MappedFacilities } from '../../components/Icons/facilities';
import { AppStyle, Normalize, KostService } from '../../config/app.config';
import SearchBackground from '../../components/Backgrounds/search_background';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ImageBackground } from 'react-native';
import { filter } from 'lodash';

// creates the promised base http client
const kostAPI = axios.create({
    baseURL: "http://" + KostService.host + KostService.port + "/"
})

export default function Search() {

    // Function Refs
    const filterCarouselRef = useRef(null);

    // Function states
    const [filters, setFilters] = useState(null)
    const [page, setPage] = useState(1)

    dummyFilter = [
        [
            {
                id: 0,
                desc: "Most Popular",
                state: false,
            },
            {
                id: 1,
                desc: "Near You",
                state: false,
            },
            {
                id: 2,
                desc: "Cheapest",
                state: false,
            },
            {
                id: 3,
                desc: "Et cetera",
                state: false,
            }
        ],
        [
            {
                id: 4,
                desc: "Et cetera",
                state: false,
            },
            {
                id: 5,
                desc: "Secondly",
                state: false,
            },
            {
                id: 6,
                desc: "Minutely",
                state: false,
            },
            {
                id: 7,
                desc: "Hourly",
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
                        <TouchableOpacity key={index} onPress={() => { updateFilterList(index, parent) }}>
                            <View style={[styles.buttonPeriod, { backgroundColor: bgColor, borderColor: AppStyle.fourt_main_color }]}>
                                <Text style={{ fontWeight: 'bold', color: txtColor, fontSize: Normalize(12) }}>{item.desc}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                })}
            </View>
        )
    }

    // update the state of the period
    const updateFilterList = (index, parent) => {

        const newArr = [...dummyFilter];

        if (filters[parent][index].state === false)
            newArr[parent][index].state = true;
        else
            newArr[parent][index].state = false;

        setFilters(newArr);
    }

    function SearchList() {

        // Function Hooks
        const [dataArrayList, setDataArrayList] = useState([])

        if (dataArrayList !== null) {
            if (dataArrayList.length === 0) {
                // Get the data via axios get request
                const { dataArray, error } = useAxiosGetArray(kostAPI, '/all/' + page, 10000);
                setDataArrayList(dataArray)
            }
        }

        function _renderSearchList({ item, index }) {

            // // Get the data via axios get request
            // const { dataArray, error } = useAxiosGetArray(kostAPI, '/' + item.id + '/facilities', 10000);

            return (
                <View style={styles.itemWrapper}>
                    <View style={styles.thumbnailContainer}>
                        <ImageBackground
                            style={styles.backgroundImg}
                            source={{ uri: item.thumbnail_url }}
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemTitle}>
                            <Text>{item.kost_name}</Text>
                        </View>
                        <View style={styles.itemLocation}>
                            <Text>{item.city}</Text>
                        </View>
                        <View style={styles.itemFacilities}>
                            {/* <MappedFacilities facilities={dataArray} category={0} /> */}
                        </View>
                        <View style={styles.itemPrice}>
                            <Text>Test</Text>
                        </View>
                    </View>
                    <View style={styles.favButton}>
                    </View>
                </View>
            )
        }

        function handleScroll() {

            const { dataArray, error } = useAxiosGetArray(kostAPI, '/all/' + page, 10000);
            setPage(page + 1)
            setDataArrayList(dataArrayList.concat(dataArray))
        }

        if (dataArrayList === null) {
            return null
        } else {
            if (dataArrayList.length === 0) {
                return null
            } else {
                return (
                    <FlatList
                        data={dataArrayList}
                        renderItem={_renderSearchList}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        onEndReached={() => {
                            handleScroll();
                        }}
                        onEndReachedThreshold={0}
                    />
                )
            }
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
                        <Carousel
                            layout={"default"}
                            ref={filterCarouselRef}
                            data={filters}
                            itemWidth={AppStyle.windowSize.width * 0.9}
                            sliderWidth={AppStyle.windowSize.width * 0.9}
                            renderItem={_renderFilters}
                        />
                    </View>
                </View>
                <View style={styles.sortButtonWrapperContaner}>
                    <View style={styles.sortButtonWrapper}>
                        <TouchableOpacity style={[styles.sortButton, { borderRightWidth: 1 }]}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sortButton}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Sort</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.sortButton, { borderLeftWidth: 1 }]}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: Normalize(12) }}>Map</Text>
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
        width: AppStyle.screenSize.width,
        height: AppStyle.screenSize.height * 0.275,
    },
    searchBar: {
        position: 'absolute',
        height: Normalize(36),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: Normalize(10),
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((AppStyle.screenSize.height * 0.275) / 2) - (Normalize(36) / 2),
    },
    carouselContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: AppStyle.windowSize.width * 0.9,
        left: AppStyle.windowSize.width * 0.05,
        top: ((((AppStyle.screenSize.height * 0.275) / 2) + (AppStyle.screenSize.height * 0.275) / 3)) - (Normalize(36) / 2),
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonPeriod: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Normalize(10),
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
    backgroundImg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    thumbnailContainer: {

    }

})
