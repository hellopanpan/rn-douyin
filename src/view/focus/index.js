import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');
import {FOCUS} from '../../api/config'

const Person = (props) => {

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView>
        <View style={styles.focuscont}>
          {
            FOCUS.map((item, index) => {
              return (
                <View style={styles.focusImgWrap} key = {index}>
                  <Image
                    style={styles.focusImg}
                    source={item.url}
                  />
                  {
                    item.live? (
                      <View style={styles.live}>
                        <View style={styles.dot}></View>
                        <Text style={styles.livetext}>直播中</Text>
                      </View>
                    ) : null
                  }
                </View> 
              )
            })
          }
          
        </View>
      </SafeAreaView>
      
      
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#fff',
    height: 2* height,
    padding: 5
  },
  text: {
    padding: 40,
    color: '#fff'
  },
  focuscont: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  focusImgWrap: {
    width: width / 2 - 8,
    marginBottom: 5,
    position: 'relative'
  },
  focusImg: {
    height: width / 2  + 80,
    width: width / 2 - 7
  },
  live: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 66,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 10
  },
  dot:{
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#333',
    marginRight: 5
  },
  livetext: {
    color: '#fff'
  }
});
export default Person