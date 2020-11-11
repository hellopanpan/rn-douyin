import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');
import {MSG} from '../../api/config'
const Person = (props) => {
  return (
    <View style={styles.scrollView}>
      <StatusBar barStyle="light-content" backgroundColor="#ecf0f1" />
      <SafeAreaView style={styles.scrollView}>
        <Text style={styles.title}>消息</Text>
        <ScrollView style={styles.wrap}>
          {
            MSG.map((item,index) => {
              return (
                <View style={[styles.msgItem, styles.flexRow]} key={index}>
                  <Image
                    style={styles.who}
                    source={item.whopic}
                  />
                  <View style={[styles.msgRight, styles.flexRow]}>
                    <View style={styles.rightText}>
                      <Text style={styles.textTop}><Text style={styles.textWho} >{item.name}</Text> 赞了你的作品</Text>
                      <Text style={styles.textTime}>{item.time}前</Text>
                    </View>
                    <Image
                      style={styles.works}
                      source={item.workpic}
                    />
                  </View>
                </View>
              ) 
            })
          }
        </ScrollView>
      </SafeAreaView>
    </View>
    
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#222',
    flex: 1
  },
  wrap: {
    width: width,
    backgroundColor: '#eee',
    flex: 1
  },
  title: {
    height: 36,
    lineHeight: 20,
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    padding: 40,
    color: '#fff'
  },
  msgItem: {
    paddingLeft: 10,

  },
  msgRight: {
    marginLeft: 15,
    marginBottom: 10,
    padding: 10,
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  rightText: {
    flex: 1
  }, 
  textTop: {
    marginBottom: 10
  },
  textWho: {
    color: '#398dee',
  }, 
  textTime: {
    color: '#777'
  },
  who: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  works: {
    height: 60,
    width: 60,
  }
});
export default Person