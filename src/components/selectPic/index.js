import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Button} from './button';
import { connect } from 'react-redux'
import { actionsCreators } from '../../store/play'
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');


const Select = (props) =>  {
  const {showDiao, pic, cancel, setUserPic}  = props
  const [response, setResponse] = React.useState(null);
  const [showBig, setShowBig] = useState(false)
  const opacityRef = useRef(new Animated.Value(600))

  // 选取后处理
  const callBack = (res) => {
    if (res && res.uri) {
      setUserPic(res.uri)
      endAnimated()
      setTimeout(() => {
        cancel()
      }, 500)
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
    <View style={styles.Wrap2}>
      {showDiao? (
        <View style={styles.Wrap}>
          <TouchableOpacity style={styles.topBtnssss}
            onPress={() => {
                endAnimated();
                setTimeout(() => {
                  cancel()
                }, 500)
              }
            }
          ></TouchableOpacity>
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
                  onPress={() => {
                    endAnimated()
                    setTimeout(() => {
                      cancel()
                      setShowBig(true)
                    }, 200)
                  }  
                }
                />
              </View>
              <View style={styles.cancel}>
                <Button
                    title="取消"
                    onPress={() => {
                        endAnimated();
                        setTimeout(() => {
                          cancel()
                        }, 500)
                      }
                    }
                  />
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      ): null}
      {
        showBig? (
          <View style={styles.bigPic}>
            <Image
              style={styles.bigPicIn}
              resizeMode={'contain'}
              source={pic}
            />
            <TouchableOpacity onPress={() => setShowBig(false)} style={styles.close}>
              <Ionicons name={'ios-close-circle'} size={22} style={[{color: '#fff', transform: [{scale: 2}]}]}></Ionicons>
            </TouchableOpacity>
          </View>
        ): null
      }
    </View> 
  );
}
Select.defaultProps = {
  showImg: () => { console.log('11111')},
  cancel: () => { console.log('111112222')},
}
const styles = StyleSheet.create({
  Wrap: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: 100,
  },
  bigPic: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#444',
    height: height,
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  }, 
  close: {
    position: 'absolute',
    right: 50,
    top: 100,
    zIndex: 200,
  },
  bigPicIn: {
    width: width,
  },
  Wrap2: {
    position: 'absolute',
    width: width,
    height: 0,
    top: 0,
    left: 0,
    zIndex: 100,
  },
  selectWrap: {
    position: 'absolute',
    height: 380,
    width: width,
    left: 0,
    bottom: 0,
  },
  topBtnssss: {
    flex: 1,
    height: height,
    width: width
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
// 数据
const mapState = state => ({
  user: state.getIn(['play', 'user']),
  pic: state.getIn(['play', 'pic']),
})
const mapDispatch = dispatch => ({
  setUserPic(value) {
    console.log('-----set')
    let action = actionsCreators.setUserPic(value);
    dispatch(action)
  }
})
export default connect(mapState, mapDispatch)(Select);