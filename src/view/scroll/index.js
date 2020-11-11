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

import { connect } from 'react-redux'
import { actionsCreators } from '../../store/play'
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoodInfo from './goodInfo';
import {DATA, DATA2, videoRef0, videoRef2} from '../../api/config'
import { useFocusEffect } from '@react-navigation/native';
const {width, height, scale} = Dimensions.get('window');

const Scroll = (props) => {
  const {good, list, navigation} = props
  const {changeData, setList, praiseVideo} = props
  const [text, setText] = useState('')
  const [selectedId, setSelectedId] = useState(null);
  const [play, setPlay] = useState(true);
  const [current, setCurrent] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const currentRef = useRef(0);
  const videoPlayRef = useRef([]);
  const flatRef = useRef();
  const startTimestampRef = useRef();
  const [videoRef, setVideoRef] = useState(videoRef2)
  
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
            setVideoRef(videoRef0)
            setList(DATA2)
            setRefreshing(false)
          }, 800);
          // goIndex(currentRef.current, false)                                                                                                                                                                                                                                                                  
        } else if ((y < -100 || speed < -0.5)&& currentRef.current < 4) {
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
    console.log('-----set---')
    changeData()
    // 翻视频
    if (flag) {
      videoPlayRef.current[index].current.seek(0)
      setPlay(true)
    }
  }
  
  useEffect(() => {
    setList(DATA)
  }, [])

  // 监听屏幕离开
  useFocusEffect(
    React.useCallback(() => {
      console.log('enedjdjdj')
      // Do something when the screen is focused
      setTimeout(() => setPlay(true), 600)
      
      return () => {
        console.log('enedjdjdj-----leaver')
        setPlay(false)
        // Do something when the screen is unfocused
      };
    }, [])
  );

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

  const onRefresh = () => {
    console.log('onRefresh')
    
  }

  //自定义Footer视图
  const renderFooter = ()=> {
    return (
      <View style={styles.loadingMore}>
        <Text style={styles.loadingText}>没有更多数据啦...</Text>
      </View>
    )
  }

  // render每条数据
  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    videoPlayRef.current[index] = React.createRef()
    return (
      <TouchableWithoutFeedback   onPress={changePlay} key={item.id}>
        <View style={[styles.item, {backgroundColor}]}>
          <View  style={styles.backgroundVideo}>
            <Video 
              ref={videoPlayRef.current[index]}
              source={videoRef[index].uri} 
              style={styles.backgroundVideo}
              resizeMode="contain" 
              paused={!((index === current) && play)}
              repeat={true}      
            />
          </View>
          {<GoodInfo itemInfo={item} praiseVideo={praiseVideo}></GoodInfo>}
          {
            !play?
              <Ionicons name={'ios-play'} size={54} color={'#fff'} style={styles.iconPlay}/>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.contain}>
      {
        list.length ? (
          <FlatList
            {...panResponder.panHandlers}
            style={styles.container}
            onMomentumScrollEnd={handelonScroll}
            ref={flatRef}
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            scrollEnabled={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} tintColor={'#fff'} titleColor={'#fff'}  title="正在刷新" onRefresh={() => onRefresh()} />
            }
            ListFooterComponent={renderFooter}
          />
        ) : null
      }
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
    width: width + 60,
    flex: 1,
    backgroundColor: '#000',
    marginLeft: -20
  }, 
  title: {
    fontSize: 32,
    position: 'absolute',
    top: 12,
    left: width/2 - 136,
    zIndex: 5000
  },
  iconPlay: {
    position: 'absolute',
    top: height/2 -50,
    left: width/2 - 16
  },
  loadingText: {
    width: width,
    height: 160,
    lineHeight: 100,
    backgroundColor: '#222',
    color: '#999',
    textAlign: 'center'
  }
});

// 获取state
const mapState = state => ({
  good: state.getIn(['play', 'good']),
  list: state.getIn(['play', 'list'])
})

// 更改state
const mapDispatch = dispatch => ({
  changeData() {
    console.log('-----set')
    let action = actionsCreators.setInfo();
    dispatch(action)
  },
  setList(value) {
    console.log('-----set---list')
    console.log('-----set---list---21' + value)
    let action = actionsCreators.setList(value);
    dispatch(action)
  },
  praiseVideo(value) {
    let action = actionsCreators.praiseVideo(value);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Scroll);
