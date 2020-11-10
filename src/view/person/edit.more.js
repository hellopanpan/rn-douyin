import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');


const Person = (props) => {
  const {navigation} = props

  useEffect(() => {
  },[])
  return (
    <View style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />
        <Text>2222</Text>
        <View style={styles.topbanner}>
          <Image
            style={styles.topbanner}
            source={require('../../static/2.jpg')}
          />
        </View>
      </ScrollView>
    </View>
    
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#222',
    height: height
  },

});
export default Person