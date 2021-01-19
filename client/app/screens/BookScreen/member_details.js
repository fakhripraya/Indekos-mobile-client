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
