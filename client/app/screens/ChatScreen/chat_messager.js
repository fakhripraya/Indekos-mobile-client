import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppStyle } from '../../config/app.config';
import { Normalize } from '../../functions/normalize';

export default function ChatMessager() {

    function _renderChatList() {
        return (
            <View>

            </View>
        )
    }

    return (
        <View>
            <View style={styles.header}>
                <Text>tes</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    renderItem={_renderChatList}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    onEndReached={() => {
                        handleScroll();
                    }}
                    onEndReachedThreshold={0.1}
                />
            </View>
            <View style={styles.footer}>
                <Text>tes</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        width: AppStyle.windowSize.width,
        height: Normalize(100),
        backgroundColor: 'gray',
    },
    body: {
        position: 'absolute',
        top: Normalize(100),
        backgroundColor: 'black',
        width: AppStyle.windowSize.width,
        height: AppStyle.windowSize.height - Normalize(100) + Normalize(60),
    },
    footer: {
        position: 'absolute',
        top: AppStyle.windowSize.height - Normalize(60),
        width: AppStyle.windowSize.width,
        height: Normalize(60),
        backgroundColor: 'pink',
    }
})

