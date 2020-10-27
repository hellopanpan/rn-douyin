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
import Route from './src/route';

const {width, height, scale} = Dimensions.get('window');
import { Provider } from 'react-redux'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Route></Route>
    </Provider>
  );
};



export default App;
