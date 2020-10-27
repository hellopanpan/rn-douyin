import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const {width, height, scale} = Dimensions.get('window');
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../view/home/index.js';
import Tab from '../view/home/tab.js';
import Msg from '../view/msg/index.js';
import Focus from '../view/focus/index.js';
import Person from '../view/person/index.js';

const Route = (props) => {
  // 获取路由据点
  const navigationRef = React.useRef(null);

  const goNavigation = (index) => {
    let path ='Home'
    if (index == 0) path = 'Home'
    if (index == 1) path = 'Focus'
    if (index == 3) path = 'Msg'
    if (index == 4) path = 'Person'
    navigationRef.current?.navigate(path)
  }
  return (
    <View style={styles.scrollView}>
      <NavigationContainer style={styles.nav} ref={navigationRef}>
        <Stack.Navigator >
          <Stack.Screen name="Home" 
            component={Home} 
            options={{
              header:  () => null
            }}
          />
          <Stack.Screen name="Focus" 
            component={Focus} 
            options={{
              header:  () => null,
              gestureEnabled: false
            }}
          />
          <Stack.Screen name="Msg" 
            component={Msg} 
            options={{
              header:  () => null,
              gestureEnabled: false
            }}
          />
          <Stack.Screen name="Person" 
            component={Person} 
            options={{
              header:  () => null,
              gestureEnabled: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Tab goNavigation = {goNavigation} ></Tab>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: '#222',
  },
  nav: {
    height: height - 50
  }
});
export default Route