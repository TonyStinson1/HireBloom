/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  SafeAreaView
} from 'react-native';
import 'react-native-gesture-handler';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/Reducers/rootReducer';
import StackScreen from './Screens/Navigation/StackScreen'

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./assets/Background.png")}
        resizeMode="contain" />
      <Image source={require("./assets/logo.png")}
        style={{
          alignItems: "center",
          justifyContent: "center",
          resizeMode: "contain",
          position: "absolute",
          width: "80%"
        }}
      />
    </View>

  );
};


const App = () => {

  const [loading, setLoading] = useState(true);
  const store = createStore(rootReducer)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Provider store={store}>
        <StackScreen />
      </Provider>
    </SafeAreaView>
  );
};


export default App;
