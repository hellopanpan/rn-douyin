import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { actionsCreators } from '../../store/tab'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const {tab, setTab, navigation, routeName} = props
  const [activeIndex, setActiveIndex] = useState(0)
  const insets = useSafeAreaInsets();

  const goNavigation = (index) => {
    let path ='Home'
    if (index == 0) path = 'Home'
    if (index == 1) path = 'Focus'
    if (index == 2) path = 'Camera'
    if (index == 3) path = 'Msg'
    if (index == 4) path = 'Person'
    navigation.navigate(path, {
        itemId: index
    })
  }

  // 监听route的state变化
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

  // s上级传入的routerName变化设置index
  useEffect(() => {
    if (routeName === 'Home') setActiveIndex(0)
    if (routeName === 'Focus') setActiveIndex(1)
    if (routeName === 'Camera') setActiveIndex(2)
    if (routeName === 'Msg') setActiveIndex(3)
    if (routeName === 'Person') setActiveIndex(4)
  }, [routeName])

  // 设置选中状态
  const SetTabWrap = (index) => {
    setActiveIndex(index)
    setTab(index)
    goNavigation(index)
  }
  return (
    <View style={[styles.cont, {paddingBottom: insets.bottom}]}>
        {
          tabData.map((item, index) =>  {
            return(
              item.id !== 'add' ? (
                <TouchableOpacity key={index} style={[index === activeIndex ? styles.activeT: null, styles.item]} onPress={() => {SetTabWrap(index)}}>
                  <Text style={[styles.text01, index === activeIndex ? styles.active : null]}> {item.name}</Text>
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
    backgroundColor: '#222'
  },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  },
  text01: {
    color: '#eee',
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
    fontSize: 18,
    color: '#fff'
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