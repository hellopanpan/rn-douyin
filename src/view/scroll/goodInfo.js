import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { actionsCreators } from '../../store/play'
const {width, height, scale} = Dimensions.get('window');

const GoodInfo = (props) => {
  const navigation = useNavigation();
  const {itemInfo, praiseVideo, setModel, comentModel} = props
  const [activeIndex, setActiveIndex] = useState(0)
  
  const  praiseVideoWrap = (id) => {
    praiseVideo(id)
    setActiveIndex(activeIndex + 1)
  }

  return (
    <View style={styles.cont}>
      <TouchableWithoutFeedback onStartShouldSetResponderCapture={()=>true}  onPress={() => praiseVideoWrap(itemInfo.id)}>
        <View style={styles.items}>
          <Ionicons name={'ios-heart'} size={30} style={{color: itemInfo.praise?'red': '#fff', transform: [{scale: 1.5}]}}></Ionicons>
          <Text style={styles.text}>{itemInfo.good}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onStartShouldSetResponderCapture={()=>true} style={styles.items} onPress={() => setModel(true)}>
        <Ionicons name={'ios-chatbox-ellipses'} size={30} style={{color: '#fff', transform: [{scale: 1.5}]}}></Ionicons>
        <Text style={styles.text}>{itemInfo.comment}</Text>
      </TouchableOpacity>
      <TouchableOpacity onStartShouldSetResponderCapture={()=>true} style={styles.items}>
        <Ionicons name={'ios-share-social-sharp'} size={30} style={{color: '#fff', transform: [{scale: 1.5}]}}></Ionicons>
        <Text style={styles.text}>{itemInfo.share}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    position: 'absolute',
    top: height / 2 - 20,
    right: 0,
  },
  items: {
    color: '#fff',
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 3,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8
  }
});

// 更新数据
const mapState = state => ({
  comentModel: state.getIn(['play', 'comentModel']),
})
const mapDispatch = dispatch => ({
  setModel(value) {
    console.log('-----set')
    let action = actionsCreators.setModel(value);
    dispatch(action)
  }
})
export default connect(mapState, mapDispatch)(GoodInfo); 