import React from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './app/route/root_stack'
import { Provider } from 'react-redux';
import store from './app/redux/store'
import PromiseSpinner from './app/promise/promise_tracker'

axios.defaults.withCredentials = true;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  }
});
