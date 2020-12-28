import React from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './app/route/root_stack'
import { Provider } from 'react-redux';
import store from './app/redux/store'
import PromiseSpinner from './app/promise/promise_tracker'

// set axios withCredentials to true to handle cors
axios.defaults.withCredentials = true;

// the root of all the applications root
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
      <PromiseSpinner style={styles.spinner} />
    </Provider>
  );
}

// the render elements style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  }
});
