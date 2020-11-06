import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RNCamera, FaceDetector } from 'react-native-camera';
const {width, height, scale} = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';
const CameraC = (props) => {
  const [foucs, setFoucs] = useState(false)
  const cameraRef = useRef()

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
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      {foucs? (
        <RNCamera
          style={styles.camera}
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
      ) : null}
      
      <TouchableOpacity onPress={() => takePicture()} >
        <Text>camera</Text>
      </TouchableOpacity>
          
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#fff',
    height: height,
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    padding: 40,
    color: '#fff'
  },
  camera: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'green'
  }
});
export default CameraC