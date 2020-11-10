import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button} from './button';
const {width, height, scale} = Dimensions.get('window');

import { connect } from 'react-redux'
import { actionsCreators } from '../../store/play'

import ImagePicker from 'react-native-image-picker';
const Select = (props) =>  {
  const [response, setResponse] = React.useState(null);
  const {showDiao, cancel, setUserPic}  = props
  const opacityRef = useRef(new Animated.Value(600))
  // 选取后处理
  const callBack = (res) => {
    if (res && res.uri) {
      setUserPic(res.uri)
      cancel()
      endAnimated()
    }
    
  }
  // 动画
  startAnimated = () => {
    Animated.timing(opacityRef.current, {
      toValue: 0,
      duration: 300,
      delay: 0,
      useNativeDriver: true
    }).start()
  }
  // 动画
  endAnimated = () => {
    Animated.timing(opacityRef.current, {
      toValue: 700,
      duration: 400,
      delay: 0,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (showDiao) startAnimated()
  }, [showDiao])

  useEffect(() => {
    
  }, [response])
  return (
    <Animated.View style={[styles.selectWrap, styles.flexRow, {transform: [{translateY: opacityRef.current}]}]}>
      <SafeAreaView>
        <View  style={styles.wrap}>
          <Button
            title="拍照"
            onPress={() =>
              ImagePicker.launchCamera(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                (response) => {
                  setResponse(response);
                  callBack(response);
                },
              )
            }
          />

          <Button
            title="选取照片"
            onPress={() =>
              ImagePicker.launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                (response) => {
                  setResponse(response);
                  callBack(response);
                },
              )
            }
          />
          <Button
            title="查看大图"
            onPress={() =>
              props.showImg()
            }
          />

          {/* <Button
            title="录视频"
            onPress={() =>
              ImagePicker.launchCamera({mediaType: 'video'}, (response) => {
                setResponse(response);
              })
            }
          />

          <Button
            title="选取视频"
            onPress={() =>
              ImagePicker.launchImageLibrary({mediaType: 'video'}, (response) => {
                setResponse(response);
              })
            }
          /> */}

          {/* <View style={styles.response}>
            <Text>Res: {JSON.stringify(response)}</Text>
          </View> */}

          {/* {response && (
            <View style={styles.image}>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: response.uri}}
              />
            </View>
          )} */}
        </View>
        <View style={styles.cancel}>
          <Button
              title="取消"
              onPress={() => {
                  endAnimated();
                  cancel();
                }
              }
            />
        </View>
      </SafeAreaView>
    </Animated.View>
    
  );
}
Select.defaultProps = {
  showImg: () => { console.log('11111')},
  cancel: () => { console.log('111112222')},
}
const styles = StyleSheet.create({
  selectWrap: {
    position: 'absolute',
    height: 380,
    width: width,
    left: 0,
    bottom: 0,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  wrap: {
    backgroundColor: '#fff',
    width: width - 30,
    borderRadius: 20,
    opacity: 0.9
  },
  cancel: {
    marginTop: 16,
    backgroundColor: '#fff',
    width: width - 30,
    borderRadius: 20,
    opacity: 0.9
  }
});
const mapDispatch = dispatch => ({
  setUserPic(value) {
    console.log('-----set')
    let action = actionsCreators.setUserPic(value);
    dispatch(action)
  }
})
export default connect(null, mapDispatch)(Select);