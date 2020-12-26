import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './app/route/rootStack'

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
