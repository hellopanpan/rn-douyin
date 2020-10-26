import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Scroll from '../scroll/index.js'
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height, scale} = Dimensions.get('window');

let tabData = [{
  name: '首页',
  id: 'index'
}, {
  name: '关注',
  id: 'focus'
}, {
  name: 'add',
  id: 'add'
}, {
  name: '消息',
  id: 'msg'
},{
  name: '我',
  id: 'my'
}]
  

const TabList = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <View style={styles.cont}>
        {
          tabData.map((item, index) =>  {
            return(
              item.id !== 'add' ? (
                <TouchableOpacity key={index} style={[index === activeIndex ? styles.activeT: null, styles.item]} onPress={() => {setActiveIndex(index)}}>
                  <Text style={[styles.text01, styles.active]}> {item.name} </Text>
                </TouchableOpacity>
              ): (
                <TouchableOpacity  key={index} style={[index === activeIndex ? styles.activeT: null, styles.center]} onPress={() => {setActiveIndex(index)}}>
                  <Ionicons name={'ios-add-outline'} size={22} style={{color: '#fff', transform: [{scale: 1.5}]}}></Ionicons>
                </TouchableOpacity>
              )
            )

          })
        }
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10, 
    paddingRight: 10, 
    alignItems: 'center',
    height: 50
  },
  item: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  },
  text01: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    opacity: 0.8
  },
  center: {
    height: 60,
    width: 50,
    justifyContent: 'center', alignItems: 'center',
    
  },
  active: {
    fontWeight: "600",
    fontSize: 18
  },
  activeT: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  }
});

export default TabList;