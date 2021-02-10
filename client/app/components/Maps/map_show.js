import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

export default function MapShow() {
    return (
        <MapView
            style={styles.mapContainer}
            loadingEnabled={true}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
        </MapView>
    )
}

const styles = StyleSheet.create({

    mapContainer: {
        width: '100%',
        height: '100%',
    }

})


