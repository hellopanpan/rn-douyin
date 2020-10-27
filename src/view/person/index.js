import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');

const Person = (props) => {
  const goEdit = () => {
    console.log('edit------')
  }
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.topbanner}>
        <Image
          style={styles.topbanner}
          source={require('../../static/2.jpg')}
        />
      </View>
      <View style={styles.ccont}>
        <View style={styles.vcont}>
          <Image
            style={styles.tinyLogo}
            source={require('../../static/1.jpg')}
          />
          <TouchableOpacity style={styles.btnWrap} pressDelay={0} onPress={() => goEdit()}>
            <Text style={[styles.btns, styles.widthbtn]}>编辑资料</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap} onPress={() => goEdit()}>
            <Ionicons name={'ios-add-outline'} size={22} style={{color: '#fff', transform: [{translateX: 10}, {translateY: 3}]}}></Ionicons>
            <Text style={[styles.btns]}>朋友</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lines}>
          <Text style={styles.title}>你的抖音昵称</Text>
          <Text style={styles.doudou}>抖抖号: 12345678</Text>
        </View>
        <View style={styles.write}>
          <Text style={styles.doudouwrite}>感谢抖音 感恩相遇</Text>
          <Text style={styles.doudouwrite}>持续更新好作品!</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.locItem}> <Ionicons name={'ios-woman'} size={12} style={{color: 'red', transform: [{translateX: 0}, {translateY: 0}]}}></Ionicons>25岁</Text>
          <Text style={styles.locItem}>成都</Text>
          <Text style={styles.locItem}>中南大学</Text>
        </View>
        
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#222',
    height: 2* height
  },
  text: {
    padding: 0,
    color: '#fff'
  },
  topbanner: {
    height: 180,
    width: width,
    backgroundColor: 'green'
  },
  ccont: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  vcont: {
    display: 'flex',
    flexDirection: 'row',
  },
  tinyLogo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'relative',
    top: -20
  },
  btns: {
    color: '#fff',
    lineHeight: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnWrap: {
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 30,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  widthbtn: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    color: '#efefef',
    fontSize: 22,
  },
  doudou: {
    color: '#999',
    fontSize: 12,
    marginTop: 10
  },
  doudouwrite: {
    color: "#eee",
    fontSize: 14,
    marginTop: 5
  },
  write: {
    marginTop: 10
  },
  lines: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666'
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
  },
  locItem: {
    color: '#fff',
    lineHeight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 20,
    marginRight: 10,
  },
});
export default Person