import React, { useState , useEffect, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Text,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBack from '../../components/header/index.js'
import Select from '../../components/selectPic/index.js'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'; 
const {width, height, scale} = Dimensions.get('window');

const Person = (props) => {
  const {user, pic} = props
  const [showDiao, setShowDiao] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    console.log(user)
  },[])

  const cancel = () => {
    setShowDiao(false)
    console.log('show cancel')
  }

  // 选取图片回调
  const callBack = (res) => {
    console.log(res)
  }
  
  return (
    <View style={styles.scrollView}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <HeaderBack title={'编辑个人资料'}></HeaderBack>
        <TouchableOpacity style={[styles.topbanner, styles.flexRow]} onPress={() => setShowDiao(true)}>
          <Image
            style={styles.topbannerPic}
            source={pic}
          />
          <Text style={styles.topbanerText}>点击更换头像</Text>
        </TouchableOpacity>
        <View style={styles.editCont}>
        {
          user.map((item, index) => {
            console.log('-----sor' + item)
            return(
              <TouchableOpacity key={index} onPress={() => {
                navigation.navigate('PersonEditMore', {
                  index: index,
                  key: item.get('key'),
                  value: item.get('value'),
                })
              }}>
                <View style={[styles.editContItem]}>
                  <Text style={styles.editContName}>{item.get('key')}</Text>
                  <Text style={styles.editContDiscribe}>{item.get('value')}</Text>
                  <View style={styles.editContIcon}>
                    <Ionicons name={'md-chevron-back'}  size={20} style={{color: '#ccc', transform: [{rotateY: '180deg'}]}}></Ionicons>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
      </SafeAreaView>
      <Select cancel={cancel} showDiao={showDiao} ></Select>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    width: width,
    backgroundColor: '#222',
    height: height,
    position: 'relative',
    width: width
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  topbanner: {
    paddingTop: 40,
    width: width,
    flexDirection: 'column'
  },
  topback: {
    height: 60,
    position: 'relative'
  },
  topbackTitle: {
    fontSize: 16,
    color: '#fff'
  },
  topbackIcon: {
    position: 'absolute',
    left: 20,
    top: 10
  },
  topbannerPic: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  topbanerText: {
    fontSize: 14,
    marginTop: 10,
    color: '#fff'
  },
  editCont: {
    paddingTop: 50,
  },
  editContItem: {
    height: 46,
    width: width,
    flexDirection: 'row',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 60,
  },
  editContIcon: {
    right: 20,
    top: 12,
    position: 'absolute'
  },
  editContDiscribe: {
    textAlign: 'right',
    color: '#bbb'
  },
  editContName: {
    textAlign: 'right',
    color: '#fff',
    fontSize: 16
  }
});
// 数据
const mapState = state => ({
  user: state.getIn(['play', 'user']),
  pic: state.getIn(['play', 'pic']),
})

export default connect(mapState, null)(Person);