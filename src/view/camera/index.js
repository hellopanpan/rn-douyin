import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Animated,
  StatusBar,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
const {width, height, scale} = Dimensions.get('window');

const CameraC = (props) => {
  const [foucs, setFoucs] = useState(false)
  const cameraRef = useRef()
  const videoPlayRef = useRef()
  const videoSourceRef = useRef()
  const opacityRef = useRef(new Animated.Value(1))
  const picSourceRef = useRef()
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back)
  const animateRef = useRef()
  const [isrecording, setIsrecording] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  // 监听屏幕离开
  useFocusEffect(
    React.useCallback(() => {
      console.log('enedjdjdj')
      // Do something when the screen is focused
      setFoucs(true)
      return () => {
        console.log('enedjdjdj-----leaver')
        setFoucs(false)
        // Do something when the screen is unfocused
      };
    }, [])
  );
  // 动画
  startAnimated = () => {
    const animationSlider =  Animated.sequence([
      Animated.timing(opacityRef.current, {
        toValue: 0,
        duration: 1000,
        delay: 0,
        useNativeDriver: true
      }),
      Animated.timing(opacityRef.current, {
        toValue: 1,
        duration: 1000,
        delay: 0,
        useNativeDriver: true
      })
    ]);
    animateRef.current = Animated.loop(animationSlider)
    animateRef.current.start();
  }
  // 停止
  stopAnimated = () => {
    animateRef.current.stop();
    Animated.timing(opacityRef.current, {
      toValue: 1,
      duration: 100,
      delay: 0,
      useNativeDriver: true
    }).start()
  }
  // 摄像头切换
  toggeleCamera = () => {
    if (cameraType == RNCamera.Constants.Type.front) setCameraType(RNCamera.Constants.Type.back)
    if (cameraType == RNCamera.Constants.Type.back) setCameraType(RNCamera.Constants.Type.front)  
  }

  // 开始拍照
  const takePicture = async () => {
    console.log('take pic')
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  //开始录像
  const takeRecord = async () => {
    if (!isrecording) {
      startAnimated()
      const options = { 
        quality: RNCamera.Constants.VideoQuality["1080p"],
        maxFileSize:(200*1024*1024),
        orientation: 'portrait'
      };
      console.log('video -- start')
      setIsrecording(true)
      const data = await cameraRef.current.recordAsync(options);
      console.log('video----' + data.uri);
      videoSourceRef.current = data.uri
    } else {
      console.log('video -- end')
      await cameraRef.current.stopRecording();
      stopAnimated();
      // 拍照
      const optionspic = { quality: 0.5, base64: true };
      const data2 = await cameraRef.current.takePictureAsync(optionspic);
      console.log(data2.uri);
      picSourceRef.current = data2.uri
    
      setIsrecording(false);
    }
    
  };
  
  return (
    <View style={styles.scrollView}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      {foucs? (
        <RNCamera
          style={styles.camera}
          ref={cameraRef}
          useNativeZoom
          maxZoom={1}
          bounds={{
            size: {
              width:width,
              height:height
            }
          }}
          // 前置或后者
          type={cameraType}
          flashMode={RNCamera.Constants.FlashMode.off}
        />
      ) : null}
      <TouchableOpacity onPress={() => toggeleCamera()} style={[styles.takepicWrapRe, styles.flexRow]}>
        <Ionicons name={'ios-repeat'} size={32} style={[{color: '#fff', transform: [{scaleY: 2}, {scaleX: 1.6}]}]}></Ionicons>
      </TouchableOpacity>
      {/* 录像 */}
      <TouchableOpacity onPress={() => takeRecord()} style={[styles.takepicWrap, styles.flexRow]}>
        <Animated.View style={[styles.takepicIn, {opacity: opacityRef.current}]}></Animated.View>
      </TouchableOpacity>
      <Text style={styles.takepicWrapText}>{
        !isrecording? '点击开始录像': '录像中'
      }</Text>
      { picSourceRef.current ? (
        // 查看录像
        <TouchableOpacity onPress={() => setShowVideo(true)} style={[styles.takepicWrap2, styles.flexRow]}>
          <Image
            style={styles.focusImg}
            source={{uri: picSourceRef.current}}
          />
        </TouchableOpacity>
      ) : null}
      
      {
        showVideo && foucs ? (
          <View style={styles.VideoWrap}>
            <TouchableOpacity onPress={() => setShowVideo(false)} style={styles.close}>
              <Ionicons name={'ios-close-circle'} size={22} style={[{color: '#fff', transform: [{scale: 2}]}]}></Ionicons>
            </TouchableOpacity>
            {
              videoSourceRef.current? (
                <Video 
                  ref={videoPlayRef}
                  source={{uri: videoSourceRef.current}} 
                  style={[styles.backgroundVideo,{transform: [{scaleY: 3}]}]} 
                  resizeMode="contain" 
                  repeat={true}      
                />
              ) : null
            }
            
          </View>
        ): null
      }
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#fff',
    height: height,
    flex: 1,
    flexDirection: 'column',
    position: 'relative'
  },
  VideoWrap: {
    height: height,
    width: width,
    backgroundColor: '#333',
    position: 'absolute',
    left: 0,
    top: 0
  },
  close: {
    position: 'absolute',
    right: 50,
    top: 100,
    zIndex: 200,
  },
  text: {
    padding: 40,
    color: '#fff'
  },
  backgroundVideo: {
    width: width,
    flex: 1
  }, 
  camera: {
    flex: 1,
    height: 300,
    width: width,
    backgroundColor: 'green'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  takepicWrap: {
    position: 'absolute',
    bottom: 20,
    left: width/2 - 40,
    height:80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#fff'
  },
  takepicWrapText: {
    position: 'absolute',
    bottom: 100,
    left: width/2 - 90,
    height:30,
    width: 180,
    color: '#fff',
    textAlign: 'center',
  },
  takepicWrapRe: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    height:80,
    width: 80,
    borderRadius: 40,
  },
  takepicWrap2: {
    position: 'absolute',
    bottom: 38,
    left: width - 100,
    height:50,
    width: 50,
    backgroundColor: '#fff'
  },
  focusImg: {
    height: 50,
    width: 50,
  },
  takepicIn: {
    height:70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#e33e33'
  }
});
export default CameraC