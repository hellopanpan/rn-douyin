/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import store from './src/store';
import Home from './src/view/home/index.js'

const {width, height, scale} = Dimensions.get('window');
import { Provider } from 'react-redux'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <View style={styles.scrollView} >
        <Home></Home>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'green',
  }
});

export default App;
