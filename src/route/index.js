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
import { NavigationContainer, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

import Home from '../view/home/index.js';
import Tab from '../view/home/tab.js';
import Model from '../view/Model/index.js';
import Msg from '../view/msg/index.js';
import Camera from '../view/camera/index.js';
import Focus from '../view/focus/index.js';
import Person from '../view/person/index.js';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const MainStack = ({navigation, route}) => {
  let routeName = getFocusedRouteNameFromRoute(route)
  console.log('-----route'+ routeName)
  return(
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Home">
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
            }}
          />
          <Stack.Screen name="Camera" 
            component={Camera} 
            options={{
              header:  () => null,
            }}
          />
          <Stack.Screen name="Msg" 
            component={Msg} 
            options={{
              header:  () => null,
            }}
          />
          <Stack.Screen name="Person" 
            component={Person} 
            options={{
              header:  () => null,
            }}
          />
        </Stack.Navigator>
        <Model></Model>
        <Tab navigation={navigation} routeName={routeName} ></Tab>
    </View>
        
  )
}

const Route = (props) => {
  // 获取路由据点
  const navigationRef = React.useRef(null);
  return (
    <View style={styles.scrollView}>
      <NavigationContainer style={styles.nav} ref={navigationRef} >
        <RootStack.Navigator mode="modal">
          <RootStack.Screen 
            name="Tab" 
            component={MainStack} 
            options={{
              header:  () => null,
              gestureEnabled: false
            }}
          >
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
      
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