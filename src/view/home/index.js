import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';

import Scroll from '../scroll/index.js'
const {width, height, scale} = Dimensions.get('window');

const Home = ({navigation}) => {
  return (
    <View style={styles.scrollView} >
      <StatusBar barStyle="light-content" />
      <Scroll navigation={navigation}></Scroll>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: '#222',
  }
});

export default Home;