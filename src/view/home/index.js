import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Scroll from '../scroll/index.js'
import TabList from './tab'

const {width, height, scale} = Dimensions.get('window');

const Home = () => {
  return (
    <View style={styles.scrollView} >
      <Scroll></Scroll>
      <TabList></TabList>
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