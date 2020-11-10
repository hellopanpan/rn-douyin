import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBack from '../../components/header/index.js'
import { useNavigation, useRoute} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { connect } from 'react-redux'
import { actionsCreators } from '../../store/play'

const {width, height, scale} = Dimensions.get('window');

const Person = (props) => {
  const {setUser} = props
  const navigation = useNavigation()
  const route = useRoute();
  const valueRef = useRef();
  const textRef = useRef();
  const [value, onChangeText] = React.useState('我的抖抖账号');


  // 监听屏幕离开
  useFocusEffect(
    React.useCallback(() => {
      console.log('enedjdjdj')
      // Do something when the screen is focused
      return () => {
        console.log('enedjdjdj-----leaver')
        console.log(valueRef.current)
        if (valueRef.current.length) {
          setUser({
            index: route.params.index,
            value: valueRef.current
          })
        }
        
        // Do something when the screen is unfocused
      };
    }, [])
  );

  // 输入框改变
  useEffect(() => {
    valueRef.current = value
  },[value])

  // 刚进入
  useEffect(() => {
    valueRef.current = route.params.value
    onChangeText(route.params.value)
  },[])

  // 返回
  const goBack = () => {
    console.log('99999' + textRef.current)
    textRef.current.blur();
    setTimeout(() => {
      navigation.goBack()
    }, 0)
  }

  return (
    <View style={styles.scrollView}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <HeaderBack title={'编辑' + route.params.key} goBack={goBack}></HeaderBack>
          <View style={styles.edit}>
            <Text style={styles.editName}>我的{route.params.key}</Text>
            <TextInput
              ref={textRef}
              autoFocus
              onBlur={() => navigation.goBack()}
              style={{ height: 50, color: '#fff',borderColor: 'rgba(0,0,0,0.1)', borderWidth: 1 , marginTop: 20}}
              onChangeText={text => {
                if (text.length <= 30) onChangeText(text)
              }}
              value={value}
            />
            <Text style={[styles.editName, {color: 'grey'}]}>{value.length}/30</Text>
          </View>
        </SafeAreaView>
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
  edit: {
    padding: 20
  },
  editName: {
    fontSize: 15,
    color: '#efefef'
  }

});
const mapDispatch = dispatch => ({
  setUser(value) {
    console.log('-----set')
    let action = actionsCreators.setUser(value);
    dispatch(action)
  }
})
export default connect(null, mapDispatch)(Person);