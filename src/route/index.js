import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');

const Route = (props) => {
  return (
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
  )
}
export default Route