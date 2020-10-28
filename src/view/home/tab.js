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
import { connect } from 'react-redux';
import { actionsCreators } from '../../store/tab'
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
  

const TabList = (props) => {
  console.log('-----tab' + props.navigation)
  const {tab, setTab, navigation} = props
  const [activeIndex, setActiveIndex] = useState(0)

  const goNavigation = (index) => {
    let path ='Home'
    if (index == 0) path = 'Home'
    if (index == 1) path = 'Focus'
    if (index == 3) path = 'Msg'
    if (index == 4) path = 'Person'
    navigation.navigate(path, {
        itemId: index
    })
  }
  useEffect(() => {
    navigation.addListener('state', e => {
      // Prevent default action
     if (e.data.state.routes[0].state) {
      // let index = Object.keys(e.data.state.routes[0].state.tabstale)
      let index = e.data.state.routes[0].state.type
      console.log('----2323238--tab' + index)
     }
    });
  }, []);

  const SetTabWrap = (index) => {
    setActiveIndex(index)
    setTab(index)
    goNavigation(index)
  }
  return (
    <View style={styles.cont}>
        {
          tabData.map((item, index) =>  {
            return(
              item.id !== 'add' ? (
                <TouchableOpacity key={index} style={[index === activeIndex ? styles.activeT: null, styles.item]} onPress={() => {SetTabWrap(index)}}>
                  <Text style={[styles.text01, styles.active]}> {item.name}</Text>
                </TouchableOpacity>
              ): (
                <TouchableOpacity  key={index} style={[index === activeIndex ? styles.activeT: null, styles.center]} onPress={() => {SetTabWrap(index)}}>
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
    height: 50,
    backgroundColor: '#222'
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

// 更新数据
const mapState = state => ({
  tab: state.getIn(['tab', 'tab']),
})
const mapDispatch = dispatch => ({
  setTab(index) {
    console.log('-----set')
    let action = actionsCreators.setTab(index);
    dispatch(action)
  }
  
})
export default connect(mapState, mapDispatch)(TabList);