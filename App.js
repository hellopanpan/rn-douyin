/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState , useEffect, useRef} from 'react';
import {
  Platform,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  PanResponder,
  TextInput,
  StyleSheet,
  SectionList,
  ScrollView,
  FlatList,
  Alert,
  View,
  Button,
  Image,
  ImageBackground,
  Animated,
  Text,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height, scale} = Dimensions.get('window');
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const App: () => React$Node = () => {
  const [text, setText] = useState('')
  const [selectedId, setSelectedId] = useState(null);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const videoPlayRef = useRef([]);

  const flatRef = useRef();
  const startTimestampRef = useRef();
  const videoRef =[{
    uri: require('./static/1.mp4')
  }, {
    uri: require('./static/2.mp4')
  },{
    uri: require('./static/3.mp4')
  }]
  
  const panResponder = useRef(
    PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 滑动开始，记录时间戳
        startTimestampRef.current = evt.nativeEvent.timestamp
      },
      onPanResponderMove: (evt, gestureState) => {
        // 累计滑动纵向距离
        let y = gestureState.dy
        console.log('----current' + currentRef.current)
        console.log('----moving' + (currentRef.current * height - y))
        flatRef.current.scrollToOffset({
          offset: currentRef.current * height - y,
          animated: true
        }) 
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 滑动结束时间戳
        let endTimestamp = evt.nativeEvent.timestamp
        // 滑动距离，根据滑动距离与时间戳计算是否切换到下一个条目
        let y = gestureState.dy
        console.log('----moveend' + y)
        let speed = y / (endTimestamp - startTimestampRef.current)
        console.log('speed || ' + speed)
        if ((y > 100 || speed > 0.5) && currentRef.current > 0) {
          // 上一夜
          goIndex(currentRef.current - 1)
        } else if ((y < -100 || speed < -0.5)&& currentRef.current < 2) {
          // 下一页
          goIndex(currentRef.current + 1)
        } else {
          //停留本页
          goIndex(currentRef.current)
        }
      }
    })
  ).current;
  // 跳转index
  const goIndex = (index) => {
    console.log('index' + index)
    flatRef.current.scrollToIndex({index, animated: true})
    currentRef.current = index
    setCurrent(index)
    videoPlayRef.current[index].current.seek(0)
  }
  
  

  // 滚动
  const handelonScroll = (e) => {
    // 滚动偏移量
    console.log('scoll' + e.nativeEvent.contentOffset.y)
  }

  const videoError = () => {
    console.log('video---error')
  }
  const onBuffer = () => {
    console.log('video---onBuffer')
  }

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    videoPlayRef.current[index] = React.createRef()
    return (
      <TouchableOpacity    style={[styles.item, {backgroundColor}]}>
        <Text style={styles.title}>{index} | {item.title} {selectedId}</Text>
        <Video 
          ref={videoPlayRef.current[index]}
          source={videoRef[index].uri} 
          style={styles.backgroundVideo}
          paused={!(index === current)}
          repeat={true}      
        />
        <Ionicons name={'ios-play'} size={24} color={'#fff'}/>
      </TouchableOpacity>
    );
  };

  const _onLongPressButton = () => {
    Alert.alert('You long-pressed the button!')
  }

  return (
    <View style={styles.scrollView} >
      <FlatList
        {...panResponder.panHandlers}
        style={styles.container}
        onMomentumScrollEnd={handelonScroll}
        ref={flatRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  scrollView: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    width: width,
  },
  item: {
    padding: 0,
    margin: 0,
    flex: 1,
    height: height,
    width: width,
  },
  backgroundVideo: {
    width: width,
    flex: 1
  }, 
  title: {
    fontSize: 32,
  },
  
});

export default App;
