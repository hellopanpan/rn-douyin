import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const HeaderBack = (props) => {
  const {goBack} = props
  const navigation = useNavigation()
  
  return (
    <View style={[styles.topback, styles.flexRow]}>
      <TouchableOpacity style={styles.topbackIcon} onPress={(goBack) || (() => navigation.goBack())}>
        <Ionicons name={'md-chevron-back'} size={33} style={{color: '#fff', transform: [{translateX: 0}, {translateY: 0}]}}></Ionicons>
      </TouchableOpacity>
      <Text style={styles.topbackTitle}>{props.title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  topback: {
    height: 60,
    position: 'relative'
  },
  topbackTitle: {
    fontSize: 16,
    color: '#fff'
  },
  topbackIcon: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 200
  }, 
});
export default HeaderBack