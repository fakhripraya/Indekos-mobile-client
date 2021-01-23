import React, { useEffect } from 'react'
import { AppStyle } from '../../config/app.config';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function MemberDetails() {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <View>
            <View>
                <View>

                </View>
                <View>

                </View>
            </View>
            <View>
                <Text>Period</Text>
                <View>
                    <Button />
                    <Button />
                    <Button />
                    <Button />
                </View>
            </View>
            <View>
                <Text>Date</Text>
                <View>
                    <Button />
                    <Button />
                    <Button />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    absoluteContainer: {
        position: 'absolute',
        elevation: 5,
        borderRadius: 15,
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        bottom: AppStyle.screenSize.height / 4.5,
        width: AppStyle.screenSize.width * 0.9,
        height: AppStyle.screenSize.height * 0.5,
    },
    container_1: {
        flex: 0.7,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    container_2: {
        flex: 0.3,

    }

})
