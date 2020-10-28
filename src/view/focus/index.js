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

const Person = (props) => {
  return (
    <View style={styles.scrollView}>
      <Text style={styles.text}>my focus</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#444',
    opacity: 0.1,
    height: 2* height
  },
  text: {
    padding: 40,
    color: '#fff'
  }
});
export default Person