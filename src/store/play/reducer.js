import { 
  SET_INFO,
  SET_LIST,
  SET_PRAISE
 } from './actionType'
// immutable 库
import { fromJS} from 'immutable'

const defaultState = fromJS({
  good: 16666,
  list: []
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