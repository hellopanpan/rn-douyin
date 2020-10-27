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

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/view/home/index.js';
import Tab from './src/view/home/tab.js';
import Person from './src/view/person/index.js';

const Stack = createStackNavigator();
const {width, height, scale} = Dimensions.get('window');
import { Provider } from 'react-redux'

const App: () => React$Node = () => {

  const navigationRef = React.useRef(null);
  const goNavigation = (index) => {
    let path ='Home'
    if (index == 0) path = 'Home'
    if (index == 1) path = 'Person'
    navigationRef.current?.navigate(path)
  }
  return (
    <Provider store={store}>
      <View style={styles.scrollView}>
        <NavigationContainer style={styles.nav} ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen name="Home" 
              component={Home} 
              options={{
                header:  () => null
              }}
            />
            <Stack.Screen name="Person" 
              component={Person} 
              options={{
                header:  () => null
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Tab goNavigation = {goNavigation}></Tab>
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
  },
  nav: {
    height: height - 50
  }
});

export default App;
