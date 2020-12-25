import React, { useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './app/screens/WelcomeScreen/index'
import { AuthService } from './app/config/app.config'

Axios.defaults.withCredentials = true;
var cancelSource;

const api = axios.create({
  baseURL: AuthService.host + AuthService.port + "/"
})

export default function App() {

  useEffect(() => {

    if (cancelSource) {
      cancelSource.cancel();
    }

    cancelSource = axios.CancelToken.source()

    api.get('/', {
      cancelToken: cancelSource.token
    })
      .then(response => {
        if (response.status === 200) {
        }
        else {
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      });
    return () => {
      // when the component unmounts
      console.log("component unmounted");
      // cancel the request (the message parameter is optional)
      source.cancel('Operation canceled by the user.');
    }
  });

  return (
    <View style={styles.container}>
      <Welcome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
