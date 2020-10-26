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
  TouchableWithoutFeedback,
  PanResponder,
  TextInput,
  StyleSheet,
  SectionList,
  RefreshControl,
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
import GoodInfo from './goodInfo';


const {width, height, scale} = Dimensions.get('window');
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    good: '12.1w',
    comment: '452'
  },{
    id: "bd7acbea-c1b1-46c2d53abb28ba",
    title: "First Item",
    good: '12.3w',
    comment: '452'
  },{
    id: "bd7acbea-c1b1--3ad53abb28ba",
    title: "First Item",
    good: '12.2w',
    comment: '452'
  },
  {
    id: "3ac68afc-c605-48d3-a4ffbd91aa97f63",
    title: "Second Item",
    good: '11.1w',
    comment: '452'
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    good: '2.1w',
    comment: '452'
  },
];

const Scroll = () => {
  const [text, setText] = useState('')
  const [selectedId, setSelectedId] = useState(null);
  const [play, setPlay] = useState(true);
  const [current, setCurrent] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const currentRef = useRef(0);
  const videoPlayRef = useRef([]);

  const flatRef = useRef();
  const startTimestampRef = useRef();
  const videoRef =[{
    uri: require('../../static/0.mp4')
  }, {
    uri: require('../../static/1.mp4')
  },{
    uri: require('../../static/2.mp4')
  },{
    uri: require('../../static/3.mp4')
  },{
    uri: require('../../static/4.mp4')
  }]
  
  const panResponder = useRef(
    PanResponder.create({
      // 要求成为响应者：
      // onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // 滑动多少距离才判定为滑动
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        let {dx,dy} = gestureState;
        if((Math.abs(dx) > 5) || (Math.abs(dy) > 5)){
          return true
        }else{
          return false
        }
            //return  (Math.abs(dx) > 5) || (Math.abs(dy) > 5); 不使用这种写法，某些三星机器异常
      },
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 滑动开始，记录时间戳
        startTimestampRef.current = evt.nativeEvent.timestamp
      },
      onPanResponderMove: (evt, gestureState) => {
        // 累计滑动纵向距离
        let y = gestureState.dy
        console.log('----current' + currentRef.current +  'time----' + evt.nativeEvent.timestamp)
        console.log('----moving' + (currentRef.current * (height- 50) - y))
        flatRef.current.scrollToOffset({
          offset: currentRef.current * (height- 50) - y + 10,
          animated: false
        }) 
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 滑动结束时间戳
        let endTimestamp = evt.nativeEvent.timestamp
        // 滑动距离，根据滑动距离与时间戳计算是否切换到下一个条目
        let y = gestureState.dy
        console.log('----moveend' + y)
        let speed = y / (endTimestamp - startTimestampRef.current)
        console.log('touchtime---' + (endTimestamp - startTimestampRef.current))
        console.log('speed || ' + speed) 
        if ((endTimestamp - startTimestampRef.current < 100) && Math.abs(speed) < 0.2) {
          goIndex(currentRef.current, false)
          return changePlay()
        }
        if ((y > 100 || speed > 0.5) && currentRef.current > 0) {
          // 上一夜
          goIndex(currentRef.current - 1, true)
        } else if ((y > 100 || speed > 0.5) && currentRef.current === 0) {
          // 上一夜
          setRefreshing(true)
          setTimeout(() => {
            setRefreshing(false)
          }, 1000);
          // goIndex(currentRef.current, false)                                                                                                                                                                                                                                                                  
        } else if ((y < -100 || speed < -0.5)&& currentRef.current < DATA.length -1) {
          // 下一页
          goIndex(currentRef.current + 1, true)
        } else {
          //停留本页
          goIndex(currentRef.current, false)
        }
      }
    })
  ).current;
  // 跳转index
  const goIndex = (index, flag) => {
    console.log('index' + index)
    flatRef.current.scrollToIndex({
      index, 
      animated: true,
      viewPosition: '0'
    })
    currentRef.current = index
    setCurrent(index)
    // 翻视频
    if (flag) {
      videoPlayRef.current[index].current.seek(0)
      setPlay(true)
    }
  }
  
  

  // 滚动
  const handelonScroll = (e) => {
    // 滚动偏移量
    console.log('scoll' + e.nativeEvent.contentOffset.y)
  }
  // 改变播放状态
  const changePlay = () => {
    console.log('---play---')
    setPlay(!play)
  }

  const videoError = () => {
    console.log('video---error')
  }
  const onBuffer = () => {
    console.log('video---onBuffer')
  }
  const onRefresh = () => {
    console.log('onRefresh')
  }
  const _onLongPressButton = () => {
    Alert.alert('You long-pressed the button!')
  }
  //自定义Footer视图
  const renderFooter = ()=> {
    return (
        <View style={styles.loadingMore}>
            <Text style={styles.loadingText}>没有更多数据啦...</Text>
        </View>
    )
}

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    videoPlayRef.current[index] = React.createRef()
    return (
      <TouchableWithoutFeedback   onPress={changePlay} >
        <View style={[styles.item, {backgroundColor}]}>
          <Text style={styles.title}>{index} | {item.title} {selectedId}</Text>
          <View  style={styles.backgroundVideo}>
            <Video 
              ref={videoPlayRef.current[index]}
              source={videoRef[index].uri} 
              style={styles.backgroundVideo}
              resizeMode="cover" 
              paused={!((index === current) && play)}
              repeat={true}      
            />
          </View>
          {<GoodInfo itemInfo={item}></GoodInfo>}
          {
            !play?
              <Ionicons name={'ios-play'} size={34} color={'#fff'} style={styles.iconPlay}/>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={styles.contain}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} tintColor={'#fff'} titleColor={'#fff'}  title="正在刷新" onRefresh={() => onRefresh()} />
        }
        ListFooterComponent={renderFooter}
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
  container: {
    flex: 1,
    width: width,
  },
  item: {
    padding: 0,
    margin: 0,
    flex: 1,
    height: height - 50,
    width: width,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  backgroundVideo: {
    width: width,
    flex: 1
  }, 
  title: {
    fontSize: 32,
    position: 'absolute',
    top: 12,
    left: width/2 - 6,
    zIndex: 5000
  },
  iconPlay: {
    position: 'absolute',
    top: height/2,
    left: width/2 - 6
  },
  loadingText: {
    width: width,
    height: 80,
    lineHeight: 40,
    backgroundColor: '#222',
    color: '#fff',
    textAlign: 'center'
  }
});

export default Scroll;
