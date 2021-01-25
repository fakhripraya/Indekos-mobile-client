import React, { useEffect } from 'react'
import { AppStyle } from '../../config/app.config';
import { Button, ScrollView, Dimensions, StyleSheet, Text, View, TextInput } from 'react-native'

export default function MemberDetails() {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, width: '100%', height: AppStyle.screenSize.height }}>
                    <Text style={styles.title}>Member Details</Text>
                    <View style={styles.absoluteContainer}>
                        <Text></Text>
                        <View>
                            <View>

                            </View>
                            <View>

                            </View>
                        </View>
                        <Text></Text>
                        <Text></Text>
                        <View>
                            <View>

                            </View>
                            <View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.mappedContainer}>
                        <View>
                            <Text></Text>
                            <Text></Text>
                        </View>
                        <View>
                            <Text></Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text></Text>
                            <TextInput />
                        </View>
                        <View>
                            <Text></Text>
                            <View>
                                <View>

                                </View>
                                <View>

                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text></Text>
                        <TextInput />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: AppStyle.screenSize.height * 0.05,
        marginBottom: AppStyle.screenSize.height * 0.05,
        fontSize: 20 / Dimensions.get("screen").fontScale,
    },
    absoluteContainer: {
        elevation: 5,
        paddingTop: '5%',
        borderRadius: 15,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.425,
        marginBottom: AppStyle.screenSize.height * 0.025,
    },
    mappedContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        alignSelf: 'center',
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.425,
        marginBottom: AppStyle.screenSize.height * 0.025,
    }
})
