import { 
  SET_INFO,
  SET_LIST,
  SET_PRAISE,
  SET_MODEL,
  SET_USER,
  SET_USER_PIC
 } from './actionType'
// immutable 库
import { fromJS} from 'immutable'

const defaultState = fromJS({
  good: 16666,
  list: [],
  comentModel: false,
  pic: require('../../static/0.jpg'),
  user:[{
    key: '名字' ,
    value: '我的抖抖账号'
  },
  {
    key: '简介' ,
    value: '我的抖抖账号感谢支持我的朋友们'
  }, 
  {
    key: '性别' ,
    value: '男'
  }, 
  {
    key: '生日' ,
    value: '1992.02.11'
  }]
})

export default (state = defaultState, action) => {
  if (action.type == SET_INFO ) {
    console.log('00000-set---')
    return state.set('good', 140)
  };
  if (action.type == SET_LIST ) {
    console.log('00000-set---list---22')
    console.log(action.value)
    return state.set('list', action.value)
  };
  if (action.type == SET_MODEL ) {
    console.log('----seeeeewweew')
    return state.set('comentModel', action.value)
  };
  if (action.type == SET_USER_PIC ) {
    console.log('----seeeeewweew')
    return state.set('pic', {uri: action.value})
  };
  if (action.type == SET_USER ) {
    console.log('----SET_USERSET_USERSET_USERSET_USER')
    let list = state.get('user')
    let index = action.value.index
    console.log(action.value.value)
    let list1 = list.update(index, item => item.set('value', action.value.value))
    return state.set('user', list1)
  };
  if (action.type == SET_PRAISE ) {
    console.log('praise')
    let list = state.get('list')
    list.forEach((item) => {
      if (item.id == action.value) {
        item.praise = !item.praise
      }
    })
    console.log('list---' + list)
    return state.set('list', list)
  };

  return state;
}