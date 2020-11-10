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
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');
import {EditList} from '../../api/config'

const Person = (props) => {
  const {navigation} = props

  useEffect(() => {
  },[])
  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <View style={[styles.topback, styles.flexRow]}>
          <TouchableOpacity style={styles.topbackIcon} onPress={() => navigation.goBack()}>
            <Ionicons name={'md-chevron-back'} size={33} style={{color: '#fff', transform: [{translateX: 0}, {translateY: 0}]}}></Ionicons>
          </TouchableOpacity>
          <Text style={styles.topbackTitle}>编辑个人资料</Text>
        </View>
        <View style={[styles.topbanner, styles.flexRow]}>
          <Image
            style={styles.topbannerPic}
            source={require('../../static/0.jpg')}
          />
          <Text style={styles.topbanerText}>点击更换头像</Text>
        </View>
        <View style={styles.editCont}>
        {
          EditList.map((item, index) => {
            return(
              <TouchableOpacity key={index}>
                <View style={[styles.editContItem]}>
                  <Text style={styles.editContName}>{item.key}</Text>
                  <Text style={styles.editContDiscribe}>{item.value}</Text>
                  <View style={styles.editContIcon}>
                    <Ionicons name={'md-chevron-back'}  size={20} style={{color: '#ccc', transform: [{rotateY: '180deg'}]}}></Ionicons>
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#222',
    height: height,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  topbanner: {
    paddingTop: 40,
    width: width,
    flexDirection: 'column'
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
    top: 10
  },
  topbannerPic: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  topbanerText: {
    fontSize: 14,
    marginTop: 10,
    color: '#fff'
  },
  editCont: {
    paddingTop: 50,
  },
  editContItem: {
    height: 46,
    width: width,
    flexDirection: 'row',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 60,
  },
  editContIcon: {
    right: 20,
    top: 12,
    position: 'absolute'
  },
  editContDiscribe: {
    textAlign: 'right',
    color: '#bbb'
  },
  editContName: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 16
  }
});
export default Person