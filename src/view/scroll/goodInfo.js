import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');

const GoodInfo = (props) => {
  const {itemInfo, praiseVideo} = props
  const [activeIndex, setActiveIndex] = useState(0)
  const  praiseVideoWrap = (id) => {
    praiseVideo(id)
    setActiveIndex(activeIndex + 1)
  }
  return (
    <View style={styles.cont}>
      <TouchableOpacity onStartShouldSetResponderCapture={()=>true} style={styles.items} onPress={() => praiseVideoWrap(itemInfo.id)}>
        <Ionicons name={'ios-heart'} size={30} style={{color: itemInfo.praise?'red': '#fff', transform: [{scale: 1.5}]}}></Ionicons>
        <Text style={styles.text}>{itemInfo.good}</Text>
      </TouchableOpacity>
      <TouchableOpacity onStartShouldSetResponderCapture={()=>true} style={styles.items}>
        <Ionicons name={'ios-chatbox-ellipses'} size={30} style={{color: '#fff', transform: [{scale: 1.5}]}}></Ionicons>
        <Text style={styles.text}>{itemInfo.comment}</Text>
      </TouchableOpacity>
      <TouchableOpacity onStartShouldSetResponderCapture={()=>true} style={styles.items}>
        <Ionicons name={'ios-share-social-sharp'} size={30} style={{color: '#fff', transform: [{scale: 1.5}]}}></Ionicons>
        <Text style={styles.text}>{itemInfo.good}</Text>
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
  }
});

export default GoodInfo;