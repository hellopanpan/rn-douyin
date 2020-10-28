import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { actionsCreators } from '../../store/play'
const {width, height, scale} = Dimensions.get('window');

const Model = (props) => {
  const {comentModel, setModel} = props
  const startTimestampRef = useRef();
  const flatRef = useRef();
  const topRef = useRef();
  const fadeAnim = useRef(new Animated.Value(height));
  const [top, setTop] = useState(10);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(fadeAnim.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const fadeOut = () => {
    setModel()
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.spring(fadeAnim.current, {
      toValue: height,
      useNativeDriver: false
    }).start();
    
  };
  const panResponder = useRef(
    PanResponder.create({
      // 要求成为响应者：
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        let {dx,dy} = gestureState;
        if((Math.abs(dx) > 5) || (Math.abs(dy) > 5)){
          return true
        }else{
          return false
        }
        //return  (Math.abs(dx) > 5) || (Math.abs(dy) > 5); 不使用这种写法，某些三星机器异常
      },

      onPanResponderGrant: (evt, gestureState) => {
        // 滑动开始，记录时间戳
        startTimestampRef.current = evt.nativeEvent.timestamp
      },
      onPanResponderMove: (evt, gestureState) => {
        // 累计滑动纵向距离
        let y = gestureState.dy
        if (y >= 0) {
          fadeAnim.current.setValue(y)
          topRef.current = y
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('------0000--' + topRef.current)
        if (topRef.current > 50) fadeOut()
        if (topRef.current <= 50) fadeIn()
        // 滑动结束时间戳 
      }
    })
  ).current; 

  useEffect(() => {
    console.log(fadeAnim.current)
  }, [fadeAnim.current])

  useEffect(() => {
    console.log('comentModel'+ comentModel)
    if (comentModel) fadeIn()
  }, [comentModel])

  return (
    <Animated.View ref={flatRef} style={[styles.scrollView, {top: fadeAnim.current}]} {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.back} onPress={() => fadeOut()}>
      </TouchableOpacity>
      <ScrollView style={styles.cont}>
        <View style={styles.contTop}>
          <Text style={styles.conttext}>评论1</Text>
          <Text style={styles.conttext}>赞112</Text>
          <TouchableOpacity  onPress={() => fadeOut()} style={styles.closeIcon} onStartShouldSetResponderCapture={()=>true}>
            <Ionicons name={'ios-close'} size={22} style={{color: '#fff', transform: [{scale: 0.9}]}}></Ionicons>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>暂无评论，来抢沙发！</Text>
      </ScrollView>
      
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    position: 'absolute',
    height: 1* height + 20,
    flex: 1,
    top: 0,
    zIndex: 100
  },
  text: {
    flex: 1,
    lineHeight: 360,
    color: '#fff',
    textAlign: 'center'
  },
  back: {
    height: 200,
    width: width,
  },
  cont: {
    flex: 1,
    backgroundColor: '#333'
  },
  contTop: {
    padding: 16,
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  conttext: {
    color: '#fff',
    fontSize: 13,
    marginRight: 10
  },
  closeIcon: {
    position: 'absolute',
    top: 10, 
    right: 16,
    height: 40,
    width: 30
  }
});

// 更新数据
const mapState = state => ({
  comentModel: state.getIn(['play', 'comentModel']),
})
const mapDispatch = dispatch => ({
  setModel() {
    console.log('-----set')
    let action = actionsCreators.setModel(false);
    dispatch(action)
  }
})
export default connect(mapState, mapDispatch)(Model); 