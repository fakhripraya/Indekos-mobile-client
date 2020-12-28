import React from 'react';
import axios from 'axios';
import store from './app/redux/store';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './app/route/root_stack';
import PromiseSpinner from './app/promise/promise_tracker';

// set axios withCredentials to true to handle cors
axios.defaults.withCredentials = true;

// the root of all the applications root
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
      <PromiseSpinner />
    </Provider>
  );
}

// the render elements style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
